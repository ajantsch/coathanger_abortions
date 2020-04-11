import { IGame, IPlayer, ICard } from "../../models";
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

const insertGamePlayer = async (
  gameId: string,
  player: IPlayer,
): Promise<IPlayer> => {
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
    const player = game.players.find(player => player.id === playerId);
    if (player) {
      return player;
    }

    throw new Error(`Could not find player ${playerId} in game ${gameId}`);
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

const drawQuestionCard = async (gameId: string): Promise<ICard> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (game) {
    const card = game.availableCards.questions.splice(0, 1)[0];
    game.activeCards.question = card;
    ACTIVE_GAMES.set(gameId, game);
    return card;
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

const selectAnswerCard = async (
  gameId: string,
  playerId: string,
  card: ICard,
) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (game) {
    if (game.czar !== playerId) {
      if (!game.activeCards.answers.find(entry => entry.player === playerId)) {
        const playerIndex = game.players
          .map(player => player.id)
          .indexOf(playerId);

        const selectedCardIndex = game.players[playerIndex].activeCards
          .map(card => card.id)
          .indexOf(card.id);

        if (selectedCardIndex >= 0) {
          game.players[playerIndex].activeCards.splice(selectedCardIndex, 1);
          game.activeCards.answers.push({ player: playerId, card });
          ACTIVE_GAMES.set(gameId, game);
          return card;
        }

        throw new Error(
          `Player ${playerId} doesn't have card ${card.id} in his deck`,
        );
      }

      throw new Error(`Player ${playerId} has already selected answer card`);
    }

    throw new Error(`Cannot select answer card as czar`);
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

const setGameCzar = async (
  gameId: string,
  playerId: string,
): Promise<IGame> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (game) {
    game.czar = playerId;
    ACTIVE_GAMES.set(gameId, game);
    return game;
  }

  throw new Error(`Could not find game with id ${gameId}`);
};

export {
  findGame,
  insertGame,
  insertGamePlayer,
  findGamePlayer,
  drawQuestionCard,
  selectAnswerCard,
  setGameCzar,
};
