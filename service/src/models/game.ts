import { IPlayer } from "./player";
import { ICard } from "./card";

interface IGame {
  id: string;
  players: IPlayer[];
  availableCards: {
    questions: ICard[];
    answers: ICard[];
  };
}

export { IGame };
