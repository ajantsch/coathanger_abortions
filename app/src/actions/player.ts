import { ThunkAction, ThunkDispatch } from "redux-thunk";

import GameApi from "../services/api";
import { IBaseAction } from "./index";
import { AppState } from "../reducers";
import { IPlayer, IGivenAnswer, IAnswerCard, IQuestionCard, ICardCombo } from "../interfaces";
import { connectSocket, disconnectSocket } from "./socket";
import { remotePlayerJoined, resetGame } from "./game";
import { resetRound } from "./round";
import { playerLoaded, resetStatus } from "./status";
import { resetNotification } from "./notification";

export enum PlayerActionTypes {
  VOID = "VOID",
  RESET_PLAYER = "RESET_PLAYER",
  GET_PLAYER = "GET_PLAYER",
  JOIN_GAME = "JOIN_GAME",
  PAUSE_PLAYING = "PAUSE_PLAYING",
  RESUME_PLAYING = "RESUME_PLAYING",
  LEAVE_GAME = "LEAVE_GAME",
  GIVE_ANSWER = "GIVE_ANSWER",
  DRAW_ANSWER = "DRAW_ANSWER",
  REPLACE_CARD = "REPLACE_CARD",
  RECEIVE_WON_QUESTION = "RECEIVE_WON_QUESTION",
}

export interface IVoidPlayerAction extends IBaseAction {
  type: PlayerActionTypes.VOID;
}

export interface IResetPlayerAction extends IBaseAction {
  type: PlayerActionTypes.RESET_PLAYER;
}

export interface IJoinGameAction extends IBaseAction {
  type: PlayerActionTypes.JOIN_GAME;
  payload: IPlayer;
}

export interface IPausePlayingAction extends IBaseAction {
  type: PlayerActionTypes.PAUSE_PLAYING;
}

export interface IResumePlayingAction extends IBaseAction {
  type: PlayerActionTypes.RESUME_PLAYING;
}

export interface ILeaveGameAction extends IBaseAction {
  type: PlayerActionTypes.LEAVE_GAME;
}

export interface IGetPlayerAction extends IBaseAction {
  type: PlayerActionTypes.GET_PLAYER;
  payload: IPlayer;
}

export interface IGiveAnswerAction extends IBaseAction {
  type: PlayerActionTypes.GIVE_ANSWER;
  payload: IGivenAnswer;
}

export interface IDrawAnswerAction extends IBaseAction {
  type: PlayerActionTypes.DRAW_ANSWER;
  payload: IAnswerCard;
}

export interface IReplaceCardAction extends IBaseAction {
  type: PlayerActionTypes.REPLACE_CARD;
  payload: IAnswerCard[];
}

export interface IReceiveWonQuestionAction extends IBaseAction {
  type: PlayerActionTypes.RECEIVE_WON_QUESTION;
  payload: ICardCombo;
}

export type PlayerAction =
  | IVoidPlayerAction
  | IResetPlayerAction
  | IJoinGameAction
  | IPausePlayingAction
  | IResumePlayingAction
  | ILeaveGameAction
  | IGetPlayerAction
  | IGiveAnswerAction
  | IReceiveWonQuestionAction
  | IDrawAnswerAction
  | IReplaceCardAction;

export function resetPlayer(): ThunkAction<IResetPlayerAction, AppState, undefined, IResetPlayerAction> {
  return (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    dispatch(disconnectSocket());
    return dispatch({
      type: PlayerActionTypes.RESET_PLAYER,
    });
  };
}

export function getPlayer(gameId: string): ThunkAction<Promise<IBaseAction>, AppState, undefined, IJoinGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    try {
      dispatch(playerLoaded());
      const playerId = localStorage.getItem(`cha_${gameId}_playerId`);
      if (!playerId) {
        return dispatch(resetPlayer());
      }
      const player = await GameApi.getGamePlayer(gameId, playerId);
      const socket = getState().socket;
      if (!socket.connected) {
        dispatch(connectSocket(gameId, player.id));
      }
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
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IJoinGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    try {
      dispatch(playerLoaded());
      const player = await GameApi.addGamePlayer(gameId, playerName);
      localStorage.setItem(`cha_${gameId as string}_playerId`, player.id);

      const socket = getState().socket;
      if (!socket.connected) {
        dispatch(connectSocket(gameId, player.id));
      }
      const { activeCards, ...remotePlayer } = player;
      dispatch(remotePlayerJoined(remotePlayer));
      return dispatch({
        type: PlayerActionTypes.JOIN_GAME,
        payload: player,
      });
    } catch (e) {
      return dispatch(resetPlayer());
    }
  };
}

export function pausePlaying(
  gameId: string,
  playerId: string,
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IPausePlayingAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    try {
      await GameApi.patchGamePlayerInactive(gameId, playerId);
      return dispatch({
        type: PlayerActionTypes.PAUSE_PLAYING,
      });
    } catch (e) {
      return dispatch({
        type: PlayerActionTypes.VOID,
      });
    }
  };
}

export function resumePlaying(
  gameId: string,
  playerId: string,
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IResumePlayingAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    try {
      await GameApi.patchGamePlayerActive(gameId, playerId);
      return dispatch({
        type: PlayerActionTypes.RESUME_PLAYING,
      });
    } catch (e) {
      return dispatch({
        type: PlayerActionTypes.VOID,
      });
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
        type: PlayerActionTypes.GIVE_ANSWER,
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

export function replaceAnswerCard(
  gameId: string,
  playerId: string,
  cardId: string,
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IReplaceCardAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const playerCards = getState().player?.activeCards;
    if (!playerCards) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }
    try {
      const newCard = await GameApi.replaceAnswer(gameId, playerId, cardId);
      const updatedPlayerCards = playerCards.map(card => (card.id === cardId ? newCard : card));
      return dispatch({
        type: PlayerActionTypes.REPLACE_CARD,
        payload: updatedPlayerCards,
      });
    } catch (e) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }
  };
}

export function receiveTrophy(
  question: IQuestionCard,
  answer: IAnswerCard,
): ThunkAction<IReceiveWonQuestionAction, AppState, undefined, IReceiveWonQuestionAction> {
  return (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    return dispatch({
      type: PlayerActionTypes.RECEIVE_WON_QUESTION,
      payload: { question, answer },
    });
  };
}

export function leaveGame(gameId: string): ThunkAction<Promise<IBaseAction>, AppState, undefined, ILeaveGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const playerId = getState().player?.id;
    if (!playerId) {
      return dispatch(resetPlayer());
    }

    try {
      await GameApi.removeGamePlayer(gameId, playerId);
      localStorage.removeItem(`cha_${gameId}_playerId`);
      dispatch(disconnectSocket());
      dispatch(resetRound());
      dispatch(resetGame());
      dispatch(resetNotification);
      dispatch(resetStatus());
      return dispatch({
        type: PlayerActionTypes.LEAVE_GAME,
      });
    } catch (e) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }
  };
}
