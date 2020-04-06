import crypto from "crypto";

import blackCards from "../../data/cards_black.txt";
import whiteCards from "../../data/cards_white.txt";

const BLACK_CARDS: Map<string, string> = new Map();
const WHITE_CARDS: Map<string, string> = new Map();

(blackCards as string).split("\n").map(line => {
  BLACK_CARDS.set(
    crypto
      .createHash("md5")
      .update(line)
      .digest("hex"),
    line,
  );
});

(whiteCards as string).split("\n").map(line => {
  WHITE_CARDS.set(
    crypto
      .createHash("md5")
      .update(line)
      .digest("hex"),
    line,
  );
});

export { BLACK_CARDS, WHITE_CARDS };
