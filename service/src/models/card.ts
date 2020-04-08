type CardType = "answer" | "question";

interface ICard {
  id: string;
  type: CardType;
  content: string;
}

export { ICard, CardType };
