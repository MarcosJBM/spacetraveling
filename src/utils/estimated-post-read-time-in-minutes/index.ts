const AVERAGE_WORDS_READ_PER_MINUTE = 200;

export function estimatedPostReadTimeInMinutes(amountOfWordsInThePost: number) {
  return Math.ceil(amountOfWordsInThePost / AVERAGE_WORDS_READ_PER_MINUTE);
}
