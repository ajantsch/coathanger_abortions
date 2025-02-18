export interface IGame {
  id: string;
  players: IRemotePlayer[];
}

export interface IRound {
  czar: IRemotePlayer["id"];
  question: IQuestionCard;
  answers: IGivenAnswer[];
  answersRevealed: boolean;
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

export interface ICardCombo {
  question: IQuestionCard;
  answer: IAnswerCard;
}

export interface IRemotePlayer {
  id: string;
  name: string;
  active: boolean;
  wonCards: ICardCombo[];
}

export interface IPlayer extends IRemotePlayer {
  activeCards: IAnswerCard[];
}

export interface IGivenAnswer {
  player: string;
  card: IAnswerCard;
}
