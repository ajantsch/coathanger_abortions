import { ThunkAction, ThunkDispatch } from "redux-thunk";

import GameApi from "../services/api";
import GameSocket from "../services/socket";
import { IBaseAction } from "./index";
import { AppState } from "../reducers";
import { IPlayer, IGivenAnswer } from "../interfaces";

export enum PlayerActionTypes {
  VOID = "VOID",
  GET_PLAYER = "GET_PLAYER",
  JOIN_GAME = "JOIN_GAME",
  GIVE_ANSER = "GIVE_ANSWER",
}

export interface IVoidAction extends IBaseAction {
  type: PlayerActionTypes.VOID;
}

export interface IJoinGameAction extends IBaseAction {
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

export type PlayerAction = IVoidAction | IJoinGameAction | IGetPlayerAction | IGiveAnswerAction;

export function getPlayer(): ThunkAction<Promise<IBaseAction>, AppState, undefined, IJoinGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const gameId = getState().game?.id;
    if (!gameId) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }

    const playerId = sessionStorage.getItem(`cha_${gameId}_playerId`);
    if (!playerId) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }

    try {
      const player = await GameApi.getGamePlayer(gameId, playerId);
      await GameSocket.connectToGame(gameId, player.name);

      return dispatch({
        type: PlayerActionTypes.GET_PLAYER,
        payload: player,
      });
    } catch (e) {
      sessionStorage.removeItem(`cha_${gameId}_playerId`);
      return dispatch({ type: PlayerActionTypes.VOID });
    }
  };
}

export function joinGame(playerName: string): ThunkAction<Promise<IBaseAction>, AppState, undefined, IJoinGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const gameId = getState().game?.id;
    if (!gameId) {
      return dispatch({ type: PlayerActionTypes.VOID });
    }

    try {
      const player = await GameApi.addGamePlayer(gameId, playerName);
      sessionStorage.setItem(`cha_${gameId as string}_playerId`, player.id);
      await GameSocket.connectToGame(gameId as string, player.name);

      return dispatch({
        type: PlayerActionTypes.JOIN_GAME,
        payload: player,
      });
    } catch (e) {
      sessionStorage.removeItem(`cha_${gameId}_playerId`);
      return dispatch({ type: PlayerActionTypes.VOID });
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
      return dispatch({ type: PlayerActionTypes.VOID });
    }

    try {
      await GameApi.selectAnswer(gameId, playerId, answer.card);
      return dispatch({
        type: PlayerActionTypes.GIVE_ANSER,
        payload: answer,
      });
    } catch (e) {
      sessionStorage.removeItem(`cha_${gameId}_playerId`);
      return dispatch({ type: PlayerActionTypes.VOID });
    }
  };
}
