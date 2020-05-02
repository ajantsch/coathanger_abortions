import { IGame, IPlayer } from "../models";

function playerOutputSanitization(player: IPlayer) {
  const { activeCards, ...sanitized } = player;
  return sanitized;
}

function gameOutputSanitization(game: IGame) {
  const { availableQuestions, availableAnswers, currentRound, ...sanitized } = {
    ...game,
    players: game.players.map(player => playerOutputSanitization(player)),
  };
  return sanitized;
}

export { playerOutputSanitization, gameOutputSanitization };
