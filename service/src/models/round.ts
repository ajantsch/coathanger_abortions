import { ICard } from "./card";
import { IPlayer } from "./player";

interface IAnswer {
  player: string;
  card: ICard;
}

interface IRound {
  czar: IPlayer["id"];
  question: ICard;
  questionRevealed: boolean;
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
