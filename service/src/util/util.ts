import { ReadStream } from "fs";
import { v4 as uuidv4 } from "uuid";

const genUuid = (delim?: string) => {
  if (delim) {
    return uuidv4()
      .split("-")
      .join(delim);
  }

  return uuidv4()
    .split("-")
    .join("");
};

function readLines(input: ReadStream, callback: (line: string) => void) {
  let remaining = "";

  input.on("data", function(data) {
    remaining += data;
    let index = remaining.indexOf("\n");
    let last = 0;
    while (index > -1) {
      const line = remaining.substring(last, index);
      last = index + 1;
      callback(line);
      index = remaining.indexOf("\n", last);
    }

    remaining = remaining.substring(last);
  });

  input.on("end", function() {
    if (remaining.length > 0) {
      callback(remaining);
    }
  });
}

function randomString(length: number, chars: string) {
  let mask = "";
  if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (chars.indexOf("#") > -1) mask += "0123456789";
  if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
  let result = "";
  for (let i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { genUuid, readLines, randomString, shuffle };
