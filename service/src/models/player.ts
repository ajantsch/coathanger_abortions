interface IPlayer {
  id: string;
  name: string;
  activeCards: Map<string, string>;
  wonCards: Map<string, string>;
}

export { IPlayer };
