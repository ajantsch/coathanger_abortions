import { IGame, IPlayer } from "../../models";
import { logger } from "../../util";

const ACTIVE_GAMES: Map<string, IGame> = new Map();

const findGame = async (id: string) => {
  const game = ACTIVE_GAMES.get(id);
  if (game) {
    return { id: game.id };
  }

  throw new Error(`Could not find game with id ${id}`);
};

const insertGame = async (game: IGame) => {
  ACTIVE_GAMES.set(game.id, game);
  logger.info(`New game started, id: ${game.id}`);
  return { id: game.id };
};

const insertGamePlayer = async (gameId: string, player: IPlayer) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (game) {
    game.players.set(player.id, player);
    logger.info(`New player added to game${game.id}: ${player.name}`);
    return player;
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

export { findGame, insertGame, insertGamePlayer };
