import { ICard } from "./card";

interface IPlayer {
  id: string;
  name: string;
  activeCards: ICard[];
  wonCards: ICard[];
}

const newPlayer = (): IPlayer => {
  return {
    id: undefined,
    name: undefined,
    activeCards: [],
    wonCards: [],
  };
};

export { IPlayer, newPlayer };
