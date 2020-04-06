import { Request, Response } from "express";

import { addNewGame, addPlayerToGame } from "./repository";
import { logger } from "../../util";

const postGame = async (req: Request, res: Response) => {
  res.type("json");

  try {
    const inserted = await addNewGame();
    res.status(201);
    res.send(inserted);
    res.end();
  } catch (err) {
    logger.error(err);
    res.status(err.status);
    res.send(err);
  } finally {
    res.end();
  }
};

const putGamePlayer = async (req: Request, res: Response) => {
  const gameId = req.params.game_id;
  const player = req.body;

  res.type("json");

  try {
    const inserted = await addPlayerToGame(gameId, player.name);
    res.status(201);
    res.send(inserted);
    res.end();
  } catch (err) {
    logger.error(err);
    res.status(err.status);
    res.send(err);
  } finally {
    res.end();
  }
};

export { postGame, putGamePlayer };
