import { IBaseAction } from "./index";

export enum StatusActionTypes {
  GAME_LOADED = "GAME_LOADED",
  PLAYER_LOADED = "PLAYER_LOADED",
  RESET_STATUS = "RESET_STATUS",
}

export interface IStatusGameLoadedAction extends IBaseAction {
  type: StatusActionTypes.GAME_LOADED;
}

export interface IStatusPlayerLoadedAction extends IBaseAction {
  type: StatusActionTypes.PLAYER_LOADED;
}

export interface IStatusResetAction extends IBaseAction {
  type: StatusActionTypes.RESET_STATUS;
}

export type StatusAction = IStatusGameLoadedAction | IStatusPlayerLoadedAction | IStatusResetAction;

export function gameLoaded(): IStatusGameLoadedAction {
  return {
    type: StatusActionTypes.GAME_LOADED,
  };
}

export function playerLoaded(): IStatusPlayerLoadedAction {
  return {
    type: StatusActionTypes.PLAYER_LOADED,
  };
}

export function resetStatus(): IStatusResetAction {
  return {
    type: StatusActionTypes.RESET_STATUS,
  };
}

export default { gameLoaded, playerLoaded, resetStatus };
