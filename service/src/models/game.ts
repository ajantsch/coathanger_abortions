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
  currentRound: {
    question: ICard;
    answers: { player: string; card: ICard }[];
    answersRevealed: boolean;
    winner: { player: string; card: ICard };
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
    currentRound: {
      question: undefined,
      answers: [],
      answersRevealed: false,
      winner: undefined,
    },
  };
};

export { IGame, newGame };
