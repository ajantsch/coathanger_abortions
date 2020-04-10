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
  activeQuestionCard: ICard;
}

export { IGame };
