import fs from "fs";
import crypto from "crypto";

import { readLines } from "../../util";

const BLACK_CARDS: Map<string, string> = new Map();
const WHITE_CARDS: Map<string, string> = new Map();

const loadAllBlackCards = () => {
  readLines(fs.createReadStream("../../../static/black.txt"), line => {
    console.log(`BLACK CARD: ${line}`);
    BLACK_CARDS.set(
      crypto
        .createHash("md5")
        .update(line)
        .digest("hex"),
      line,
    );
  });
};

const loadAllWhiteCards = () => {
  readLines(fs.createReadStream("../../../static/white.txt"), line => {
    console.log(`WHITE CARD: ${line}`);
    WHITE_CARDS.set(
      crypto
        .createHash("md5")
        .update(line)
        .digest("hex"),
      line,
    );
  });
};

const init = () => {
  loadAllBlackCards();
  loadAllWhiteCards();
};

export { init, BLACK_CARDS, WHITE_CARDS };
