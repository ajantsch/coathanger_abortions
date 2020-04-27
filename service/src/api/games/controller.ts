import { Request, Response } from "express";

import { IGame, IPlayer } from "../../models";
import { newGame } from "../../models/game";
import { newPlayer } from "../../models/player";
import { getQuestionCards, getAnswerCards } from "../cards/repository";
import {
  findGame,
  insertGame,
  insertGamePlayer,
  findGamePlayer,
  selectAnswer,
  revealQuestion,
  revealAnswers,
  selectWinningCard,
  findCurrentRound,
  startNewRound,
  drawAnswer,
} from "./repository";
import { logger, randomString, genUuid, shuffle } from "../../util";
import { socket } from "../../server";

const PLAYER_ANSWER_CARD_COUNT = 10;

function replaceErrors(_key: string, value: unknown) {
  if (value instanceof Error) {
    const error = {};

    Object.getOwnPropertyNames(value).forEach(function(key) {
      if (key !== "stack") {
        error[key] = value[key];
      }
    });

    return error;
  }

  return value;
}

function gameOutputSanitization(game: IGame) {
  const { availableQuestions, availableAnswers, currentRound, ...sanitized } = {
    ...game,
    players: game.players.map(player => {
      const { activeCards, ...sanitized } = player;
      return sanitized;
    }),
  };
  return sanitized;
}

const getGame = async (req: Request, res: Response) => {
  const id = req.params.game_id;
  res.type("json");

  try {
    const game = await findGame(id);
    res.status(200);
    res.send(gameOutputSanitization(game));
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const postGame = async (_req: Request, res: Response) => {
  res.type("json");

  const answerCards = await getAnswerCards();
  const questionCards = await getQuestionCards();

  const game: IGame = {
    ...newGame(),
    id: randomString(6, "aA#"),
    availableQuestions: shuffle(questionCards),
    availableAnswers: shuffle(answerCards),
  };

  try {
    const inserted = await insertGame(game);
    res.status(201);
    res.send(gameOutputSanitization(inserted));
    res.end();
  } catch (err) {
    logger.error(err);
    res.status(500);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const putGamePlayer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const { name } = req.body;

  res.type("json");

  const player: IPlayer = {
    ...newPlayer(),
    id: genUuid(),
    name: name,
  };

  try {
    const game = await findGame(gameId);
    player.activeCards = game.availableAnswers.splice(0, PLAYER_ANSWER_CARD_COUNT);

    const inserted = await insertGamePlayer(gameId, player);
    socket.of(`/${gameId}`).emit("player_joined", inserted);

    res.status(201);
    res.send(inserted);
    res.end();
  } catch (err) {
    logger.error(err);
    res.status(500);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const getGamePlayer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const playerId = req.params.player_id;

  res.type("json");

  try {
    const player = await findGamePlayer(gameId, playerId);
    res.status(200);
    res.send(player);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const patchRevealQuestion = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;

  res.type("json");

  try {
    const round = await revealQuestion(gameId);

    socket.of(`/${gameId}`).emit("question_card_revealed");

    res.status(200);
    res.send(round);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const putAnswer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const { player: playerId, card } = req.body;

  res.type("json");

  try {
    const answer = await selectAnswer(gameId, playerId, card);

    socket.of(`/${gameId}`).emit("answer_card_given", { player: playerId, card });

    res.status(200);
    res.send(answer);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const patchRevealAnswers = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;

  res.type("json");

  try {
    const revealed = await revealAnswers(gameId);

    socket.of(`/${gameId}`).emit("answers_revealed", revealed);

    res.status(200);
    res.send(revealed);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const postWinningAnswer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const { player: playerId, card } = req.body;

  res.type("json");

  try {
    const answer = await selectWinningCard(gameId, playerId, card.id);

    socket.of(`/${gameId}`).emit("round_winner_set", answer);

    res.status(200);
    res.send(answer);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const getCurrentRound = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;

  res.type("json");

  try {
    const round = await findCurrentRound(gameId);

    res.status(200);
    res.send(round);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const putNewRound = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;

  res.type("json");

  try {
    const round = await startNewRound(gameId);

    socket.of(`/${gameId}`).emit("new_round_started", round);

    res.status(200);
    res.send(round);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const getAnswer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const playerId = req.params.player_id;

  res.type("json");

  try {
    const card = await drawAnswer(gameId, playerId);

    res.status(200);
    res.send(card);
  } catch (err) {
    logger.error(err);
    res.status(500);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

export {
  getGame,
  postGame,
  putGamePlayer,
  getGamePlayer,
  patchRevealQuestion,
  putAnswer,
  patchRevealAnswers,
  postWinningAnswer,
  getCurrentRound,
  putNewRound,
  getAnswer,
};
