import { Request, Response } from "express";

import { IGame, IPlayer } from "../../models";
import { getQuestionCards, getAnswerCards } from "../cards/repository";
import {
  findGame,
  insertGame,
  insertGamePlayer,
  findGamePlayer,
  drawQuestionCard,
  setGameCzar,
} from "./repository";
import { logger, randomString, genUuid, shuffle } from "../../util";
import { socket } from "../../server";

const PLAYER_ANSWER_CARD_COUNT = 5;

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
    czar: undefined,
    availableCards: {
      questions: shuffle(questionCards),
      answers: shuffle(answerCards),
    },
    activeQuestionCard: undefined,
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
    player.activeCards = game.availableCards.answers.splice(
      0,
      PLAYER_ANSWER_CARD_COUNT,
    );

    const inserted = await insertGamePlayer(gameId, player);

    socket.of(`/${gameId}`).emit("player_joined", inserted);

    const updatedGame = await findGame(gameId);
    // if the first player was added to the game, elect him czar
    if (updatedGame && updatedGame.players.length === 1) {
      setGameCzar(updatedGame.id, updatedGame.players[0].id);
      socket.of(`/${gameId}`).emit("czar_set", updatedGame.players[0].id);
    }

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
  const playerId = req.params.player_id;

  res.type("json");

  try {
    const player = await findGamePlayer(gameId, playerId);
    res.status(200);
    res.send(player);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(err);
  } finally {
    res.end();
  }
};

const getQuestionCard = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;

  res.type("json");

  try {
    const card = await drawQuestionCard(gameId);
    res.status(200);
    res.send(card);
  } catch (err) {
    logger.error(err);
    res.status(404);
    res.send(err);
  } finally {
    res.end();
  }
};

export { getGame, postGame, putGamePlayer, getGamePlayer, getQuestionCard };
