import { ThunkAction, ThunkDispatch } from "redux-thunk";

import GameApi from "../services/api";
import GameSocket from "../services/socket";
import { IBaseAction } from "./index";
import { AppState } from "../reducers";
import { IGame, IPlayer, IRemotePlayer, IQuestionCard, IGivenAnswer, IRound } from "../interfaces";
import { initialState } from "../reducers/game";

export enum GameActionTypes {
  GET_GAME = "GET_GAME",
  START_GAME = "START_GAME",
  JOIN_GAME = "JOIN_GAME",
  REMOTE_PLAYER_JOINED = "REMOTE_PLAYER_JOINED",
  CZAR_SET = "CZAR_SET",
  DRAW_QUESTION = "DRAW_QUESTION",
  REVEAL_ANSWERS = "REVEAL_ANSWERS",
  RECEIVE_QUESTION = "RECEIVE_QUESTION",
  RECEIVE_ANSWER = "RECEIVE_ANSWER",
  RECEIVE_ANSWERS_REVEALED = "RECEIVE_ANSWERS_REVEALED",
  RECEIVE_WINNER = "RECEIVE_WINNER",
  GIVE_ANSER = "GIVE_ANSWER",
  SET_WINNER = "SET_WINNER",
}

export interface IGetGameAction extends IBaseAction {
  type: GameActionTypes.GET_GAME;
  payload: IGame;
}

export interface IStartGameAction extends IBaseAction {
  type: GameActionTypes.START_GAME;
  payload: IGame;
}

export interface IJoinGameAction extends IBaseAction {
  type: GameActionTypes.JOIN_GAME;
  payload: IPlayer;
}

export interface IRemotePlayerJoinedAction extends IBaseAction {
  type: GameActionTypes.REMOTE_PLAYER_JOINED;
  payload: IRemotePlayer;
}

export interface ICzarSetAction extends IBaseAction {
  type: GameActionTypes.CZAR_SET;
  payload: string;
}

export interface IReceiveQuestionAction extends IBaseAction {
  type: GameActionTypes.RECEIVE_QUESTION;
  payload: IQuestionCard;
}

export interface IDrawQuestionAction extends IBaseAction {
  type: GameActionTypes.DRAW_QUESTION;
  payload: IQuestionCard;
}

export interface IRevealAnswersAction extends IBaseAction {
  type: GameActionTypes.REVEAL_ANSWERS;
}

export interface IReceiveAnswerAction extends IBaseAction {
  type: GameActionTypes.RECEIVE_ANSWER;
  payload: IGivenAnswer;
}

export interface IReceiveReveiledAnswersAction extends IBaseAction {
  type: GameActionTypes.RECEIVE_ANSWERS_REVEALED;
  payload: IRound;
}

export interface IReceiveWinnerAction extends IBaseAction {
  type: GameActionTypes.RECEIVE_WINNER;
  payload: IGivenAnswer;
}

export interface IGiveAnswerAction extends IBaseAction {
  type: GameActionTypes.GIVE_ANSER;
  payload: IGivenAnswer;
}

export interface ISetWinnerAction extends IBaseAction {
  type: GameActionTypes.SET_WINNER;
  payload: IGivenAnswer;
}

export type GameAction =
  | IGetGameAction
  | IStartGameAction
  | IJoinGameAction
  | IRemotePlayerJoinedAction
  | ICzarSetAction
  | IDrawQuestionAction
  | IReceiveQuestionAction
  | IReceiveAnswerAction
  | IRevealAnswersAction
  | IReceiveReveiledAnswersAction
  | IReceiveWinnerAction
  | IGiveAnswerAction
  | ISetWinnerAction;

export function startGame(): ThunkAction<Promise<IStartGameAction>, AppState, undefined, IStartGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IStartGameAction>) => {
    const game = await GameApi.createGame();

    return dispatch({
      type: GameActionTypes.START_GAME,
      payload: game,
    });
  };
}

export function getGame(gameId: string): ThunkAction<Promise<IGetGameAction>, AppState, undefined, IGetGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IGetGameAction>) => {
    try {
      const game = await GameApi.getGame(gameId);
      return dispatch({
        type: GameActionTypes.GET_GAME,
        payload: game,
      });
    } catch (e) {
      return dispatch({
        type: GameActionTypes.GET_GAME,
        payload: initialState,
      });
    }
  };
}

export function joinGame(
  playerName: string,
): ThunkAction<Promise<IJoinGameAction>, AppState, undefined, IJoinGameAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IJoinGameAction>, getState) => {
    const gameId = getState().game.id;
    const player = await GameApi.addGamePlayer(gameId as string, playerName);

    await GameSocket.connectToGame(gameId as string, playerName);

    dispatch(getGame(gameId as string));

    return dispatch({
      type: GameActionTypes.JOIN_GAME,
      payload: player,
    });
  };
}

export function remotePlayerJoined(player: IRemotePlayer): IRemotePlayerJoinedAction {
  return {
    type: GameActionTypes.REMOTE_PLAYER_JOINED,
    payload: player,
  };
}

export function czarSet(playerId: string): ICzarSetAction {
  return {
    type: GameActionTypes.CZAR_SET,
    payload: playerId,
  };
}

export function questionReceived(question: IQuestionCard): IReceiveQuestionAction {
  return {
    type: GameActionTypes.RECEIVE_QUESTION,
    payload: question,
  };
}

export function answerReceived(answer: IGivenAnswer): IReceiveAnswerAction {
  return {
    type: GameActionTypes.RECEIVE_ANSWER,
    payload: answer,
  };
}

export function answersRevealed(answer: IRound): IReceiveReveiledAnswersAction {
  return {
    type: GameActionTypes.RECEIVE_ANSWERS_REVEALED,
    payload: answer,
  };
}

export function winnerReceived(winner: IGivenAnswer): IReceiveWinnerAction {
  return {
    type: GameActionTypes.RECEIVE_WINNER,
    payload: winner,
  };
}

export function drawQuestion(): ThunkAction<Promise<IDrawQuestionAction>, AppState, undefined, IDrawQuestionAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IDrawQuestionAction>, getState) => {
    const gameId = getState().game.id;
    const questionCard = await GameApi.drawQuestionCard(gameId as string);

    return dispatch({
      type: GameActionTypes.DRAW_QUESTION,
      payload: questionCard,
    });
  };
}

export function revealAnswers(): ThunkAction<Promise<IRevealAnswersAction>, AppState, undefined, IRevealAnswersAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IRevealAnswersAction>, getState) => {
    const gameId = getState().game.id;
    await GameApi.revealAnswers(gameId as string);

    return dispatch({
      type: GameActionTypes.REVEAL_ANSWERS,
    });
  };
}

export function giveAnswer(
  answer: IGivenAnswer,
): ThunkAction<Promise<IGiveAnswerAction>, AppState, undefined, IGiveAnswerAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IGiveAnswerAction>, getState) => {
    const gameId = getState().game.id;
    const player = getState().game.me;
    await GameApi.selectAnswerCard(gameId as string, player?.id as string, answer.card);

    return dispatch({
      type: GameActionTypes.GIVE_ANSER,
      payload: answer,
    });
  };
}

export function setWinner(
  answer: IGivenAnswer,
): ThunkAction<Promise<ISetWinnerAction>, AppState, undefined, ISetWinnerAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, ISetWinnerAction>, getState) => {
    const gameId = getState().game.id;
    const player = getState().game.me;

    await GameApi.selectRoundWinner(gameId as string, player?.id as string, answer);
    return dispatch({
      type: GameActionTypes.SET_WINNER,
      payload: answer,
    });
  };
}
