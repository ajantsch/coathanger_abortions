import { IGame, IPlayer, ICard } from "../../models";
import { logger } from "../../util";

const ACTIVE_GAMES: Map<string, IGame> = new Map();

const findGame = async (id: string) => {
  const game = ACTIVE_GAMES.get(id);
  if (!game) {
    throw new Error(`Could not find game with id ${id}`);
  }

  return game;
};

const insertGame = async (game: IGame) => {
  if (ACTIVE_GAMES.has(game.id)) {
    throw new Error(`Could not create game with id ${game.id} because id already exists`);
  }

  ACTIVE_GAMES.set(game.id, game);
  logger.info(`New game started, id: ${game.id}`);
  return game;
};

const insertGamePlayer = async (gameId: string, player: IPlayer): Promise<IPlayer> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  game.players.push(player);
  ACTIVE_GAMES.set(game.id, game);
  logger.info(`New player added to game ${game.id}: ${player.name}`);
  return player;
};

const findGamePlayer = async (gameId: string, playerId: string) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  const player = game.players.find(player => player.id === playerId);

  if (!player) {
    throw new Error(`Could not find player ${playerId} in game ${gameId}`);
  }

  return player;
};

const startNewRound = async (gameId: string) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  game.activeCards = {
    question: undefined,
    answers: [],
  };
  ACTIVE_GAMES.set(gameId, game);
};

const drawQuestionCard = async (gameId: string): Promise<ICard> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  const card = game.availableCards.questions.splice(0, 1)[0];
  game.activeCards.question = card;
  ACTIVE_GAMES.set(gameId, game);
  return card;
};

const selectAnswerCard = async (gameId: string, playerId: string, card: ICard) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }
  if (game.czar === playerId) {
    throw new Error(`Cannot select answer card as czar`);
  }
  if (game.activeCards.answers.find(entry => entry.player === playerId)) {
    throw new Error(`Player ${playerId} has already selected answer card`);
  }

  const playerIndex = game.players.map(player => player.id).indexOf(playerId);
  const selectedCardIndex = game.players[playerIndex].activeCards.map(card => card.id).indexOf(card.id);

  if (selectedCardIndex < 0) {
    throw new Error(`Player ${playerId} doesn't have card ${card.id} in his deck`);
  }

  game.players[playerIndex].activeCards.splice(selectedCardIndex, 1);
  logger.info(`player answer received from ${playerId}`);
  game.activeCards.answers.push({ player: playerId, card });
  ACTIVE_GAMES.set(gameId, game);
  return card;
};

const selectWinningCard = async (gameId: string, playerId: string, cardId: string) => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  if (game.czar !== playerId) {
    throw new Error(`Cannot select winning card if you are not the czar`);
  }

  const winningAnswer = game.activeCards.answers.find(answer => answer.card.id === cardId);
  logger.info(`winning answer selected, player is ${winningAnswer.player}`);

  if (!winningAnswer) {
    throw new Error(`Card with id ${cardId} not found in set of answers`);
  }

  const playerIndex = game.players.map(player => player.id).indexOf(playerId);
  game.players[playerIndex].wonCards.push(winningAnswer.card);
  return winningAnswer;
};

const setGameCzar = async (gameId: string, playerId: string): Promise<IGame> => {
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
  selectWinningCard,
  startNewRound,
  setGameCzar,
};
