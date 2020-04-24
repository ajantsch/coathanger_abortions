import { IPlayer } from "./player";
import { ICard } from "./card";
import { IRound } from "./round";

interface IGame {
  id: string;
  players: IPlayer[];
  availableQuestions: ICard[];
  availableAnswers: ICard[];
  currentRound: IRound;
}

const newGame = (): IGame => {
  return {
    id: undefined,
    players: [],
    availableQuestions: [],
    availableAnswers: [],
    currentRound: undefined,
  };
};

export { IGame, newGame };
