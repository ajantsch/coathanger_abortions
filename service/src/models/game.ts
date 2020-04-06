import { IPlayer } from "./player";

interface IGame {
  id: string;
  players: Map<string, IPlayer>;
  availableCards: {
    black: Map<string, string>;
    white: Map<string, string>;
  };
  disposedCards: {
    black: Map<string, string>;
    white: Map<string, string>;
  };
}

export { IGame };
