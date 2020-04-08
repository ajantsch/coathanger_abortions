import { Request, Response } from "express";

import { IGame, IPlayer } from "../../models";
import { getQuestionCards, getAnswerCards } from "../cards/repository";
import {
  findGame,
  insertGame,
  insertGamePlayer,
  findGamePlayer,
} from "./repository";
import { logger, randomString, genUuid, shuffle } from "../../util";
import { socket } from "../../server";

const getGame = async (req: Request, res: Response) => {
  const id = req.params.game_id;
  res.type("json");

  try {
    const game = await findGame(id);
    res.status(200);
    res.send(game);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(err);
  } finally {
    res.end();
  }
};

const postGame = async (_req: Request, res: Response) => {
  res.type("json");

  const answerCards = await getAnswerCards();
  const questionCards = await getQuestionCards();

  const game: IGame = {
    id: randomString(6, "aA#"),
    players: [],
    availableCards: {
      questions: shuffle(questionCards),
      answers: shuffle(answerCards),
    },
  };

  try {
    const inserted = await insertGame(game);
    res.status(201);
    res.send(inserted);
    res.end();
  } catch (err) {
    logger.error(err);
    res.status(500);
    res.send(err);
  } finally {
    res.end();
  }
};

const putGamePlayer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const { name } = req.body;

  res.type("json");

  const player: IPlayer = {
    id: genUuid(),
    name: name,
    activeCards: [],
    wonCards: [],
  };

  try {
    const game = await findGame(gameId);
    player.activeCards = game.availableCards.answers.splice(0, 5);

    const inserted = await insertGamePlayer(gameId, player);

    socket.of(`/${gameId}`).emit("player_joined_game", inserted);

    res.status(201);
    res.send(inserted);
    res.end();
  } catch (err) {
    logger.error(err);
    res.status(500);
    res.send(err);
  } finally {
    res.end();
  }
};

const getGamePlayer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const playerId = req.params.playerId;

  res.type("json");

  try {
    const game = await findGamePlayer(gameId, playerId);
    res.status(200);
    res.send(game);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(err);
  } finally {
    res.end();
  }
};

export { getGame, postGame, putGamePlayer, getGamePlayer };
