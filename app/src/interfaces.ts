export interface IGame {
  id?: string;
  me?: IPlayer;
  players: IRemotePlayer[];
  czar?: string;
  currentRound: IRound;
}

export interface IRound {
  question?: IQuestionCard;
  answers: IGivenAnswer[];
  winner?: IGivenAnswer;
}

export interface ICard {
  id: string;
  content: string;
  type: "answer" | "question";
}

export interface IAnswerCard extends ICard {
  type: "answer";
}

export interface IQuestionCard extends ICard {
  type: "question";
}

export interface IRemotePlayer {
  id: string;
  name: string;
  wonCards: ICard[];
}

export interface IPlayer extends IRemotePlayer {
  activeCards: ICard[];
}

export interface IGivenAnswer {
  player: string;
  card: ICard;
}
