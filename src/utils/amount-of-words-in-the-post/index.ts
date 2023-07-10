import * as prismicH from '@prismicio/helpers';
import { RichTextField } from '@prismicio/types';

export type ContentProps = {
  heading: string;
  body: RichTextField;
};

export function amountOfWordsInThePost(content: ContentProps[]) {
  const wordsInPost = content.reduce((accumulator: string[], currentValue) => {
    const bodyAsText = prismicH.asText(currentValue.body);

    const postSectionAsText = new Array<string>(
      currentValue.heading,
      bodyAsText
    );

    const arrayOfWords = postSectionAsText.flatMap(word =>
      word.split(/[^a-zA-Z0-9]+/g)
    );

    const arrayOfNonEmptyWords = arrayOfWords.filter(value => value !== '');

    return accumulator.concat(arrayOfNonEmptyWords);
  }, []);

  return wordsInPost.length;
}
