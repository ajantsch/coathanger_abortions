import { ThunkAction, ThunkDispatch } from "redux-thunk";

import GameApi from "../services/api";
import GameSocket from "../services/socket";
import { IBaseAction } from "./index";
import { AppState } from "../reducers";
import { IPlayer, IGivenAnswer, IAnswerCard, IQuestionCard, ICardCombo } from "../interfaces";

export enum PlayerActionTypes {
  VOID = "VOID",
  RESET_PLAYER = "RESET_PLAYER",
  GET_PLAYER = "GET_PLAYER",
  JOIN_GAME = "JOIN_GAME",
  GIVE_ANSER = "GIVE_ANSWER",
  DRAW_ANSWER = "DRAW_ANSWER",
  RECEIVE_WON_QUESTION = "RECEIVE_WON_QUESTION",
}

export interface IVoidPlayerAction extends IBaseAction {
  type: PlayerActionTypes.VOID;
}

export interface IResetPlayerAction extends IBaseAction {
  type: PlayerActionTypes.RESET_PLAYER;
}

export interface IEnterGameAction extends IBaseAction {
  type: PlayerActionTypes.JOIN_GAME;
  payload: IPlayer;
}

export interface IGetPlayerAction extends IBaseAction {
  type: PlayerActionTypes.GET_PLAYER;
  payload: IPlayer;
}

export interface IGiveAnswerAction extends IBaseAction {
  type: PlayerActionTypes.GIVE_ANSER;
  payload: IGivenAnswer;
}

export interface IDrawAnswerAction extends IBaseAction {
  type: PlayerActionTypes.DRAW_ANSWER;
  payload: IAnswerCard;
}

export interface IReceiveWonQuestion extends IBaseAction {
  type: PlayerActionTypes.RECEIVE_WON_QUESTION;
  payload: ICardCombo;
}

export type PlayerAction =
  | IVoidPlayerAction
  | IResetPlayerAction
  | IEnterGameAction
  | IGetPlayerAction
  | IGiveAnswerAction
  | IReceiveWonQuestion
  | IDrawAnswerAction;

export function resetPlayer(): ThunkAction<IResetPlayerAction, AppState, undefined, IResetPlayerAction> {
  return (dispatch: ThunkDispatch<AppState, undefined, IResetPlayerAction>) => {
    return dispatch({
      type: PlayerActionTypes.RESET_PLAYER,
    });
  };
}

export function getPlayer(gameId: string): ThunkAction<Promise<IBaseAction>, AppState, undefined, IEnterGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    try {
      const playerId = localStorage.getItem(`cha_${gameId}_playerId`);
      if (!playerId) {
        return dispatch(resetPlayer());
      }

      const player = await GameApi.getGamePlayer(gameId, playerId);
      await GameSocket.connectToGame(gameId, player.id);

      return dispatch({
        type: PlayerActionTypes.GET_PLAYER,
        payload: player,
      });
    } catch (e) {
      return dispatch(resetPlayer());
    }
  };
}

export function joinGame(
  gameId: string,
  playerName: string,
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IEnterGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    try {
      const player = await GameApi.addGamePlayer(gameId, playerName);
      localStorage.setItem(`cha_${gameId as string}_playerId`, player.id);
      await GameSocket.connectToGame(gameId, player.id);

      return dispatch({
        type: PlayerActionTypes.JOIN_GAME,
        payload: player,
      });
    } catch (e) {
      return dispatch(resetPlayer());
    }
  };
}

export function giveAnswer(
  answer: IGivenAnswer,
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IGiveAnswerAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const gameId = getState().game?.id;
    if (!gameId) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }

    const playerId = getState().player?.id;
    if (!playerId) {
      return dispatch(resetPlayer());
    }

    try {
      await GameApi.selectAnswer(gameId, playerId, answer.card);
      return dispatch({
        type: PlayerActionTypes.GIVE_ANSER,
        payload: answer,
      });
    } catch (e) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }
  };
}

export function drawAnswer(): ThunkAction<Promise<IBaseAction>, AppState, undefined, IDrawAnswerAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const gameId = getState().game?.id;
    if (!gameId) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }

    const playerId = getState().player?.id;
    if (!playerId) {
      return dispatch(resetPlayer());
    }

    try {
      const card = await GameApi.drawAnswer(gameId, playerId);
      return dispatch({
        type: PlayerActionTypes.DRAW_ANSWER,
        payload: card,
      });
    } catch (e) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }
  };
}

export function receiveWonQuestion(
  question: IQuestionCard,
  answer: IAnswerCard,
): ThunkAction<IReceiveWonQuestion, AppState, undefined, IReceiveWonQuestion> {
  return (dispatch: ThunkDispatch<AppState, undefined, IReceiveWonQuestion>) => {
    return dispatch({
      type: PlayerActionTypes.RECEIVE_WON_QUESTION,
      payload: { question, answer },
    });
  };
}
