import { ICard } from "./card";

interface IPlayer {
  id: string;
  name: string;
  active: boolean;
  activeCards: ICard[];
  wonCards: ICard[];
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
