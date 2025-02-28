import { Request, Response } from "express";

import { IGame, IPlayer } from "../../models";
import { newGame } from "../../models/game";
import { newPlayer } from "../../models/player";
import { getQuestionCards, getAnswerCards } from "../cards/repository";
import {
  findGame,
  insertGame,
  insertGamePlayer,
  removeGamePlayer,
  findGamePlayer,
  selectAnswer,
  revealAnswers,
  selectWinningCard,
  findCurrentRound,
  startNewRound,
  drawAnswer,
  replaceAnswer,
  setPlayerActiveStatus,
} from "./repository";
import { logger, randomString, genUuid, shuffle, playerOutputSanitization, gameOutputSanitization } from "../../util";
import { socket } from "../../server";

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
    id: randomString(6, "a#"),
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
    const inserted = await insertGamePlayer(gameId, player);
    socket.to(gameId).emit("player_joined", inserted);

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

const deleteGamePlayer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const playerId = req.params.player_id;

  res.type("json");

  try {
    const player = await removeGamePlayer(gameId, playerId);

    socket.to(gameId).emit("player_removed", player);

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

const putAnswer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const { player: playerId, card } = req.body;

  res.type("json");

  try {
    const answer = await selectAnswer(gameId, playerId, card);

    socket.to(gameId).emit("answer_card_received", { player: playerId, card });

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

    socket.to(gameId).emit("answers_revealed", revealed);

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

    socket.to(gameId).emit("round_winner_set", answer);

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

    socket.to(gameId).emit("new_round_started", round);

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

const patchReplaceCard = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const playerId = req.params.player_id;
  const { id } = req.body;

  res.type("json");

  try {
    const card = await replaceAnswer(gameId, playerId, id);
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

const patchPlayerActive = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const playerId = req.params.player_id;

  res.type("json");

  try {
    const player = await setPlayerActiveStatus(gameId, playerId, true);

    socket.to(gameId).emit("player_set_active", playerOutputSanitization(player));

    res.status(200);
    res.send(player);
  } catch (err) {
    logger.error(err);
    res.status(500);
    res.send(JSON.stringify(err, replaceErrors));
  } finally {
    res.end();
  }
};

const patchPlayerInactive = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const playerId = req.params.player_id;

  res.type("json");

  try {
    const player = await setPlayerActiveStatus(gameId, playerId, false);

    socket.to(gameId).emit("player_set_inactive", playerOutputSanitization(player));

    res.status(200);
    res.send(player);
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
  deleteGamePlayer,
  putAnswer,
  patchRevealAnswers,
  postWinningAnswer,
  getCurrentRound,
  putNewRound,
  getAnswer,
  patchReplaceCard,
  patchPlayerActive,
  patchPlayerInactive,
};
