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

function touchSupported(): boolean {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    // touch is not available
    return false;
  }
}

export { shuffle, touchSupported };
