import { IGame, IPlayer } from "../../models";
import { logger } from "../../util";

const ACTIVE_GAMES: Map<string, IGame> = new Map();

const findGame = async (id: string) => {
  const game = ACTIVE_GAMES.get(id);
  if (game) {
    return game;
  }

  throw new Error(`Could not find game with id ${id}`);
};

const insertGame = async (game: IGame) => {
  if (!ACTIVE_GAMES.has(game.id)) {
    ACTIVE_GAMES.set(game.id, game);
    logger.info(`New game started, id: ${game.id}`);
    return game;
  }

  throw new Error(
    `Could not create game with id ${game.id} because id already exists`,
  );
};

const insertGamePlayer = async (gameId: string, player: IPlayer) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (game) {
    game.players.push(player);
    ACTIVE_GAMES.set(game.id, game);
    logger.info(`New player added to game ${game.id}: ${player.name}`);
    return player;
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

const findGamePlayer = async (gameId: string, playerId: string) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (game) {
    const player = game.players.filter(player => player.id === playerId);
    if (player && player.length) {
      return player;
    }

    throw new Error(`Could not find player ${playerId} in game ${gameId}`);
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

export { findGame, insertGame, insertGamePlayer, findGamePlayer };
