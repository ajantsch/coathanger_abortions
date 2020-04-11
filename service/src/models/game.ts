import { IPlayer } from "./player";
import { ICard } from "./card";

interface IGame {
  id: string;
  players: IPlayer[];
  czar: IPlayer["id"];
  availableCards: {
    questions: ICard[];
    answers: ICard[];
  };
  activeCards: {
    question: ICard;
    answers: { player: string; card: ICard }[];
  };
}

const newGame = (): IGame => {
  return {
    id: undefined,
    players: [],
    czar: undefined,
    availableCards: {
      questions: [],
      answers: [],
    },
    activeCards: {
      question: undefined,
      answers: [],
    },
  };
};

export { IGame, newGame };
