import { ThunkAction, ThunkDispatch } from "redux-thunk";

import GameApi from "../services/api";
import { IBaseAction } from "./index";
import { AppState } from "../reducers";
import { IGivenAnswer, IRound } from "../interfaces";

import { receiveWonQuestion, drawAnswer } from "./player";

export enum RoundActionTypes {
  VOID = "VOID",
  RESET_ROUND = "RESET_ROUND",
  START_ROUND = "START_ROUND",
  GET_CURRENT_ROUND = "GET_CURRENT_ROUND",
  RECEIVE_ROUND = "RECEIVE_ROUND",
  REVEAL_QUESTION = "REVEAL_QUESTION",
  RECEIVE_QUESTION_REVEALED = "RECEIVE_QUESTION_REVEALED",
  GIVE_ANSWER = "GIVE_ANSWER",
  RECEIVE_ANSWER = "RECEIVE_ANSWER",
  REVEAL_ANSWERS = "REVEAL_ANSWERS",
  RECEIVE_ANSWERS_REVEALED = "RECEIVE_ANSWERS_REVEALED",
  SET_WINNER = "SET_WINNER",
  RECEIVE_WINNER = "RECEIVE_WINNER",
}

export interface IVoidRoundAction extends IBaseAction {
  type: RoundActionTypes.VOID;
}

export interface IResetRoundAction extends IBaseAction {
  type: RoundActionTypes.RESET_ROUND;
}

export interface IStartRoundAction extends IBaseAction {
  type: RoundActionTypes.START_ROUND;
  payload: IRound;
}

export interface IGetCurrentRoundAction extends IBaseAction {
  type: RoundActionTypes.GET_CURRENT_ROUND;
  payload: IRound;
}

export interface IReceiveRoundAction extends IBaseAction {
  type: RoundActionTypes.RECEIVE_ROUND;
  payload: IRound;
}

export interface IRevealQuestionAction extends IBaseAction {
  type: RoundActionTypes.REVEAL_QUESTION;
}

export interface IReceiveQuestionRevealedAction extends IBaseAction {
  type: RoundActionTypes.RECEIVE_QUESTION_REVEALED;
}

export interface IGiveAnswerAction extends IBaseAction {
  type: RoundActionTypes.GIVE_ANSWER;
  payload: IGivenAnswer;
}

export interface IReceiveAnswerAction extends IBaseAction {
  type: RoundActionTypes.RECEIVE_ANSWER;
  payload: IGivenAnswer;
}

export interface IRevealAnswersAction extends IBaseAction {
  type: RoundActionTypes.REVEAL_ANSWERS;
  payload: IRound;
}

export interface IReceiveAnswersRevealedAction extends IBaseAction {
  type: RoundActionTypes.RECEIVE_ANSWERS_REVEALED;
  payload: IRound;
}

export interface ISetWinnerAction extends IBaseAction {
  type: RoundActionTypes.SET_WINNER;
  payload: IGivenAnswer;
}

export interface IReceiveWinnerAction extends IBaseAction {
  type: RoundActionTypes.RECEIVE_WINNER;
  payload: IGivenAnswer;
}

export type RoundAction =
  | IVoidRoundAction
  | IResetRoundAction
  | IStartRoundAction
  | IGetCurrentRoundAction
  | IReceiveRoundAction
  | IRevealQuestionAction
  | IReceiveQuestionRevealedAction
  | IGiveAnswerAction
  | IReceiveAnswerAction
  | IRevealAnswersAction
  | IReceiveAnswersRevealedAction
  | ISetWinnerAction
  | IReceiveWinnerAction;

export function resetRound(): IResetRoundAction {
  return {
    type: RoundActionTypes.RESET_ROUND,
  };
}

export function roundReceived(
  round: IRound,
): ThunkAction<IReceiveRoundAction, AppState, undefined, IReceiveRoundAction> {
  return (dispatch: ThunkDispatch<AppState, undefined, IReceiveRoundAction>, getState) => {
    const player = getState().player;
    if (player && player.activeCards.length < 10) {
      dispatch(drawAnswer());
    }
    return dispatch({
      type: RoundActionTypes.RECEIVE_ROUND,
      payload: round,
    });
  };
}

export function questionRevealed(): IReceiveQuestionRevealedAction {
  return {
    type: RoundActionTypes.RECEIVE_QUESTION_REVEALED,
  };
}

export function answerReceived(answer: IGivenAnswer): IReceiveAnswerAction {
  return {
    type: RoundActionTypes.RECEIVE_ANSWER,
    payload: answer,
  };
}

export function answersRevealed(round: IRound): IReceiveAnswersRevealedAction {
  return {
    type: RoundActionTypes.RECEIVE_ANSWERS_REVEALED,
    payload: round,
  };
}

export function winnerReceived(
  winner: IGivenAnswer,
): ThunkAction<IReceiveWinnerAction, AppState, undefined, IReceiveWinnerAction> {
  return (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>, getState) => {
    const round = getState().round;
    const player = getState().player;
    if (round) {
      if (player?.id === winner.player) {
        dispatch(receiveWonQuestion(round.question, winner.card));
      }
    }
    return dispatch({
      type: RoundActionTypes.RECEIVE_WINNER,
      payload: winner,
    });
  };
}

export function startNewRound(): ThunkAction<Promise<IStartRoundAction>, AppState, undefined, IStartRoundAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IStartRoundAction>, getState) => {
    const gameId = getState().game?.id;
    const round = await GameApi.startNewRound(gameId as string);

    return dispatch({
      type: RoundActionTypes.START_ROUND,
      payload: round,
    });
  };
}

export function getCurrentRound(
  gameId: string,
): ThunkAction<Promise<IBaseAction>, AppState, undefined, IGetCurrentRoundAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IBaseAction>) => {
    try {
      const round = await GameApi.getRound(gameId);

      return dispatch({
        type: RoundActionTypes.GET_CURRENT_ROUND,
        payload: round,
      });
    } catch (e) {
      return dispatch({
        type: RoundActionTypes.RESET_ROUND,
      });
    }
  };
}

export function revealQuestion(): ThunkAction<
  Promise<IRevealQuestionAction>,
  AppState,
  undefined,
  IRevealQuestionAction
> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IRevealQuestionAction>, getState) => {
    const gameId = getState().game?.id;
    await GameApi.revealQuestion(gameId as string);

    return dispatch({
      type: RoundActionTypes.REVEAL_QUESTION,
    });
  };
}

export function revealAnswers(): ThunkAction<Promise<IRevealAnswersAction>, AppState, undefined, IRevealAnswersAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IRevealAnswersAction>, getState) => {
    const gameId = getState().game?.id;
    const round = await GameApi.revealAnswers(gameId as string);

    return dispatch({
      type: RoundActionTypes.REVEAL_ANSWERS,
      payload: round,
    });
  };
}

export function setWinner(
  answer: IGivenAnswer,
): ThunkAction<Promise<ISetWinnerAction>, AppState, undefined, ISetWinnerAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, ISetWinnerAction>, getState) => {
    const gameId = getState().game?.id as string;
    const playerId = getState().player?.id as string;
    await GameApi.selectRoundWinner(gameId, playerId, answer);

    return dispatch({
      type: RoundActionTypes.SET_WINNER,
      payload: answer,
    });
  };
}
