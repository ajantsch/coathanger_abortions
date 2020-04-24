import { ICard } from "./card";
import { IPlayer } from "./player";

interface IAnswer {
  player: string;
  card: ICard;
}

interface IRound {
  question: ICard;
  questionRevealed: boolean;
  czar: IPlayer["id"];
  answers: IAnswer[];
  answersRevealed: boolean;
  winner: IAnswer | undefined;
}

const newRound = (): IRound => {
  return {
    question: undefined,
    questionRevealed: false,
    czar: undefined,
    answers: [],
    answersRevealed: false,
    winner: undefined,
  };
};

export { IRound, IAnswer, newRound };
