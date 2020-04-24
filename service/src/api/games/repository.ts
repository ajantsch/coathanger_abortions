import { IGame, IPlayer, ICard, IRound, IAnswer } from "../../models";
import { newRound } from "../../models/round";
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

const startNewRound = async (gameId: string): Promise<IRound> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  if (!game.players.length) {
    throw new Error(`Cannot start round without players in the game`);
  }

  const round = newRound();
  round.question = game.availableQuestions.splice(0, 1)[0];
  if (game.currentRound && game.currentRound.winner) {
    round.czar = game.currentRound.winner.player;
  } else {
    const randomPlayerIndex = Math.floor(Math.random() * (game.players.length + 1));
    round.czar = game.players[randomPlayerIndex].id;
  }
  game.currentRound = round;
  ACTIVE_GAMES.set(gameId, game);
  return game.currentRound;
};

const revealQuestion = async (gameId: string): Promise<IRound> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  game.currentRound.questionRevealed = true;
  ACTIVE_GAMES.set(gameId, game);
  return game.currentRound;
};

const selectAnswer = async (gameId: string, playerId: string, card: ICard): Promise<ICard> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }
  if (game.currentRound.czar === playerId) {
    throw new Error(`Cannot select answer card as czar`);
  }
  if (game.currentRound.answers.find(entry => entry.player === playerId)) {
    throw new Error(`Player ${playerId} has already selected answer card`);
  }

  const playerIndex = game.players.map(player => player.id).indexOf(playerId);
  const selectedCardIndex = game.players[playerIndex].activeCards.map(card => card.id).indexOf(card.id);

  if (selectedCardIndex < 0) {
    throw new Error(`Player ${playerId} doesn't have card ${card.id} in his deck`);
  }

  game.players[playerIndex].activeCards.splice(selectedCardIndex, 1);
  logger.info(`player answer received from ${playerId}`);
  game.currentRound.answers.push({ player: playerId, card });
  ACTIVE_GAMES.set(gameId, game);
  return card;
};

const revealAnswers = async (gameId: string): Promise<IRound> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  game.currentRound.answersRevealed = true;
  ACTIVE_GAMES.set(gameId, game);
  return game.currentRound;
};

const selectWinningCard = async (gameId: string, playerId: string, cardId: string): Promise<IAnswer> => {
  const game = ACTIVE_GAMES.get(gameId);
  if (!game) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  if (game.currentRound.czar !== playerId) {
    throw new Error(`Cannot select winning card if you are not the czar`);
  }

  const winningAnswer = game.currentRound.answers.find(answer => answer.card.id === cardId);
  if (!winningAnswer) {
    throw new Error(`Card with id ${cardId} not found in set of answers`);
  }

  logger.info(`winning answer selected, player is ${winningAnswer.player}`);

  game.currentRound.winner = winningAnswer;
  const playerIndex = game.players.map(player => player.id).indexOf(playerId);
  game.players[playerIndex].wonCards.push(winningAnswer.card);
  ACTIVE_GAMES.set(gameId, game);
  return winningAnswer;
};

export {
  findGame,
  insertGame,
  insertGamePlayer,
  findGamePlayer,
  revealQuestion,
  selectAnswer,
  revealAnswers,
  selectWinningCard,
  startNewRound,
};
