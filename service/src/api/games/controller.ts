import { Request, Response } from "express";

import { IGame, IPlayer } from "../../models";
import { getAllBlackCards, getAllWhiteCards } from "../cards/repository";
import { findGame, insertGame, insertGamePlayer } from "./repository";
import { logger, randomString, genUuid } from "../../util";
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

  const whiteCards = await getAllWhiteCards();
  const blackCards = await getAllBlackCards();

  const game: IGame = {
    id: randomString(6, "aA#"),
    players: new Map<string, IPlayer>(),
    availableCards: {
      black: blackCards,
      white: whiteCards,
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
    activeCards: new Map<string, string>(),
    wonCards: new Map<string, string>(),
  };

  try {
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

export { getGame, postGame, putGamePlayer };
