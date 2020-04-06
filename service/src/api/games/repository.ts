import { IGame, IPlayer } from "../../models";
import { randomString, genUuid } from "../../util";
import { BLACK_CARDS, WHITE_CARDS } from "../cards/repository";

const ACTIVE_GAMES: Map<string, IGame> = new Map();

const addNewGame = async () => {
  const game: IGame = {
    id: randomString(6, "aA#"),
    players: new Map(),
    availableCards: {
      black: BLACK_CARDS,
      white: WHITE_CARDS,
    },
  };

  ACTIVE_GAMES.set(game.id, game);
  console.info(`New game started, id: ${game.id}`);
  return game;
};

const addPlayerToGame = async (gameId: string, name: string) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (game) {
    const player: IPlayer = {
      id: genUuid(),
      name: name,
      wonCards: new Map<string, string>(),
    };
    game.players.set(player.id, player);
    console.info(`New player added to game${game.id}: ${player.name}`);
    return player;
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

export { addNewGame, addPlayerToGame };
