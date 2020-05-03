import { ICard } from "./card";

interface ICardCombo {
  question: ICard;
  answer: ICard;
}

interface IPlayer {
  id: string;
  name: string;
  active: boolean;
  activeCards: ICard[];
  wonCards: ICardCombo[];
}

const newPlayer = (): IPlayer => {
  return {
    id: undefined,
    name: undefined,
    active: false,
    activeCards: [],
    wonCards: [],
  };
};

export { IPlayer, newPlayer };
