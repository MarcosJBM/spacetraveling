interface ContentProps {
  body: {
    text: string;
  }[];
}

export function amountOfWordsInThePost(content: ContentProps[]) {
  const arrayOfWords = content.reduce((accumulator: string[], currentValue) => {
    const wordsInBody = currentValue.body.map(item => item.text.split(' '));

    return accumulator.concat(...wordsInBody);
  }, []);

  return arrayOfWords.length;
}
