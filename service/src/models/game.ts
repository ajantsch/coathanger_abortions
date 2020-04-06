import { IPlayer } from "./player";

interface IGame {
  id: string;
  players: Map<IPlayer["id"], IPlayer>;
  availableCards: {
    black: Map<string, string>;
    white: Map<string, string>;
  };
}

export { IGame };
