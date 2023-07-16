import { asHTML } from '@prismicio/helpers';
import { RichTextField } from '@prismicio/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services';
import {
  amountOfWordsInThePost,
  ContentProps,
  estimatedPostReadTimeInMinutes,
  formatPostPublicationDate,
} from '../../utils';
import styles from './post.module.scss';

interface PostDataProps {
  title: string;
  author: string;
  banner: {
    url: string;
    alt: string;
  };
  content: {
    heading: string;
    body: {
      text: string;
    }[];
  }[];
}

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: PostDataProps;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) return <h1>Carregando...</h1>;

  const estimatedPostReadTime = estimatedPostReadTimeInMinutes(
    amountOfWordsInThePost(post.data.content as ContentProps[])
  );

  const postPublicationDate = formatPostPublicationDate(
    post.first_publication_date
  );

  return (
    <>
      <Head>
        <title>{`${post.data.title} | spacetraveling`}</title>
      </Head>

      <main className={styles.postContainer}>
        <Image
          src={post.data.banner.url}
          alt={post.data.banner.alt}
          width='1440px'
          height='400px'
          objectFit='cover'
        />

        <article className={styles.postContent}>
          <h1 className={styles.postTitle}>{post.data.title}</h1>

          <div className={styles.postInformation}>
            <div>
              <FiCalendar />
              <span>{postPublicationDate}</span>
            </div>

            <div>
              <FiUser />
              <span>{post.data.author}</span>
            </div>

            <div>
              <FiClock />
              <span>{estimatedPostReadTime} min</span>
            </div>
          </div>

          {post.data.content.map(({ body, heading }) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: asHTML(body as RichTextField),
                }}
              />
            </section>
          ))}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});

  const posts = await prismic.getByType('posts');

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid || '',
    },
  }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const prismic = getPrismicClient({});

  const response = await prismic.getByUID('posts', slug);

  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: response.data as PostDataProps,
  };

  return {
    props: {
      post,
    },
  };
};
