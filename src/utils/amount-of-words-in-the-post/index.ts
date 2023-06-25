type ContentProps = {
  heading: string;
  body: {
    text: string;
  }[];
}[];

export function amountOfWordsInThePost(content: ContentProps) {
  const arrayOfWords = content.reduce((accumulator: string[], currentValue) => {
    const textInBody = currentValue.body.flatMap(value =>
      value.text.split(/[^a-zA-Z0-9]+/)
    );

    const textInHeading = currentValue.heading.split(/[^a-zA-Z0-9]+/);

    return accumulator.concat(textInHeading, textInBody);
  }, []);

  const arrayOfNonEmptyWords = arrayOfWords.filter(value => value !== '');

  return arrayOfNonEmptyWords.length;
}
