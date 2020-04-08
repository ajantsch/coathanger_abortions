import { ICard } from "./card";

interface IPlayer {
  id: string;
  name: string;
  activeCards: ICard[];
  wonCards: ICard[];
}

export { IPlayer };
