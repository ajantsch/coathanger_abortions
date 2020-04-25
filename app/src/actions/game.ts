import { ThunkAction, ThunkDispatch } from "redux-thunk";

import GameApi from "../services/api";
import { IBaseAction } from "./index";
import { AppState } from "../reducers";
import { IGame, IRemotePlayer } from "../interfaces";

export enum GameActionTypes {
  RESET_GAME = "RESET_GAME",
  GET_GAME = "GET_GAME",
  START_GAME = "START_GAME",
  REMOTE_PLAYER_JOINED = "REMOTE_PLAYER_JOINED",
  REVEAL_QUESTION = "REVEAL_QUESTION",
  RECEIVE_QUESTION_REVEALED = "RECEIVE_QUESTION_REVEALED",
  REVEAL_ANSWERS = "REVEAL_ANSWERS",
  RECEIVE_ANSWER = "RECEIVE_ANSWER",
  RECEIVE_ANSWERS_REVEALED = "RECEIVE_ANSWERS_REVEALED",
  RECEIVE_WINNER = "RECEIVE_WINNER",
  SET_WINNER = "SET_WINNER",
}

export interface IResetGameAction extends IBaseAction {
  type: GameActionTypes.RESET_GAME;
}

export interface IGetGameAction extends IBaseAction {
  type: GameActionTypes.GET_GAME;
  payload: IGame;
}

export interface IStartGameAction extends IBaseAction {
  type: GameActionTypes.START_GAME;
  payload: IGame;
}

export interface IRemotePlayerJoinedAction extends IBaseAction {
  type: GameActionTypes.REMOTE_PLAYER_JOINED;
  payload: IRemotePlayer;
}

export type GameAction = IResetGameAction | IGetGameAction | IStartGameAction | IRemotePlayerJoinedAction;

export function startGame(): ThunkAction<Promise<IBaseAction>, AppState, undefined, IStartGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    const game = await GameApi.createGame();

    if (!game) {
      return dispatch({
        type: GameActionTypes.RESET_GAME,
      });
    }

    return dispatch({
      type: GameActionTypes.START_GAME,
      payload: game,
    });
  };
}

export function getGame(gameId: string): ThunkAction<Promise<IBaseAction>, AppState, undefined, IGetGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    try {
      const game = await GameApi.getGame(gameId);
      if (!game) {
        return dispatch({
          type: GameActionTypes.RESET_GAME,
        });
      }

      return dispatch({
        type: GameActionTypes.GET_GAME,
        payload: game,
      });
    } catch (e) {
      sessionStorage.removeItem(`cha_${gameId}_playerId`);
      return dispatch({
        type: GameActionTypes.RESET_GAME,
      });
    }
  };
}

export function remotePlayerJoined(player: IRemotePlayer): IRemotePlayerJoinedAction {
  return {
    type: GameActionTypes.REMOTE_PLAYER_JOINED,
    payload: player,
  };
}
