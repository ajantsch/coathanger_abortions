import { ThunkAction, ThunkDispatch } from "redux-thunk";

import GameApi from "../services/api";
import { IBaseAction } from "./index";
import { AppState } from "../reducers";
import { IGame, IRemotePlayer, IGivenAnswer, ICardCombo } from "../interfaces";
import { getCurrentRound } from "./round";

export enum GameActionTypes {
  VOID = "VOID",
  RESET_GAME = "RESET_GAME",
  GET_GAME = "GET_GAME",
  START_GAME = "START_GAME",
  REMOTE_PLAYER_JOINED = "REMOTE_PLAYER_JOINED",
  REMOTE_PLAYER_INACTIVE = "REMOTE_PLAYER_INACTIVE",
  REMOTE_PLAYER_ACTIVE = "REMOTE_PLAYER_ACTIVE",
  REMOTE_PLAYER_REMOVED = "REMOTE_PLAYER_REMOVED",
  ASSIGN_WINNING_CARD = "ASSIGN_WINNING_CARD",
}

export interface IVoidGameAction extends IBaseAction {
  type: GameActionTypes.VOID;
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
export interface IRemotePlayerInactiveAction extends IBaseAction {
  type: GameActionTypes.REMOTE_PLAYER_INACTIVE;
  payload: IRemotePlayer;
}

export interface IRemotePlayerActiveAction extends IBaseAction {
  type: GameActionTypes.REMOTE_PLAYER_ACTIVE;
  payload: IRemotePlayer;
}

export interface IRemotePlayerRemovedAction extends IBaseAction {
  type: GameActionTypes.REMOTE_PLAYER_REMOVED;
  payload: string;
}

export interface IAssignWinningCard extends IBaseAction {
  type: GameActionTypes.ASSIGN_WINNING_CARD;
  payload: { playerId: string; combo: ICardCombo };
}

export type GameAction =
  | IVoidGameAction
  | IResetGameAction
  | IGetGameAction
  | IStartGameAction
  | IRemotePlayerJoinedAction
  | IRemotePlayerInactiveAction
  | IRemotePlayerActiveAction
  | IRemotePlayerRemovedAction
  | IAssignWinningCard;

export function resetGame(): IResetGameAction {
  return {
    type: GameActionTypes.RESET_GAME,
  };
}

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

export function remotePlayerInactive(player: IRemotePlayer): IRemotePlayerInactiveAction {
  return {
    type: GameActionTypes.REMOTE_PLAYER_INACTIVE,
    payload: player,
  };
}

export function remotePlayerActive(player: IRemotePlayer): IRemotePlayerActiveAction {
  return {
    type: GameActionTypes.REMOTE_PLAYER_ACTIVE,
    payload: player,
  };
}

export function remotePlayerRemoved(
  gameId: string,
  playerId: string,
): ThunkAction<IBaseAction, AppState, undefined, IRemotePlayerRemovedAction> {
  return (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    dispatch(getCurrentRound(gameId));
    return dispatch({
      type: GameActionTypes.REMOTE_PLAYER_REMOVED,
      payload: playerId,
    });
  };
}

export function assignWinningCard(
  winner: IGivenAnswer,
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IAssignWinningCard> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const gameId = getState().game?.id;
    if (!gameId) {
      return dispatch({
        type: GameActionTypes.VOID,
      });
    }

    const round = getState().round;
    if (!round) {
      return dispatch({
        type: GameActionTypes.VOID,
      });
    }

    return dispatch({
      type: GameActionTypes.ASSIGN_WINNING_CARD,
      payload: { playerId: winner.player, combo: { question: round.question, answer: winner.card } },
    });
  };
}
