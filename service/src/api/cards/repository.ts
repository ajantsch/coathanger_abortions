import crypto from "crypto";

import { ICard } from "../../models";

import questionCards from "../../data/questions.txt";
import answerCards from "../../data/answers.txt";

const QUESTION_CARDS: ICard[] = [];
const ANSWER_CARDS: ICard[] = [];

(questionCards as string).split("\n").map(line => {
  QUESTION_CARDS.push({
    id: crypto
      .createHash("md5")
      .update(line)
      .digest("hex"),
    content: line,
    type: "question",
  });
});

(answerCards as string).split("\n").map(line => {
  ANSWER_CARDS.push({
    id: crypto
      .createHash("md5")
      .update(line)
      .digest("hex"),
    content: line,
    type: "answer",
  });
});

const getAnswerCards = async (): Promise<ICard[]> => {
  return ANSWER_CARDS;
};

const getQuestionCards = async (): Promise<ICard[]> => {
  return QUESTION_CARDS;
};

export { getQuestionCards, getAnswerCards };
