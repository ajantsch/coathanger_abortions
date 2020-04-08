interface IGame {
  id: string;
  players: { id: string; name: string }[];
  availableCards: {
    black: { id: string; content: string }[];
    white: { id: string; content: string }[];
  };
}

export { IGame };
