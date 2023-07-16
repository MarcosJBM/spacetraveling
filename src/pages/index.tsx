import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { Container } from '../components';
import { getPrismicClient } from '../services';
import { formatPostPublicationDate } from '../utils';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string | null;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const TWENTY_FOUR_HOURS = 60 * 60 * 24;

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    postsPagination.next_page
  );

  const hasNextPage = typeof nextPageUrl === 'string';

  async function fetchMorePosts() {
    if (!nextPageUrl) return;

    await fetch(nextPageUrl)
      .then(response => response.json())
      .then((data: PostPagination) => {
        setNextPageUrl(data.next_page);
        setPosts(oldState => [...oldState, ...data.results]);
      });
  }

  return (
    <>
      <Head>
        <title>spacetraveling</title>
      </Head>

      <Container>
        <div className={styles.homeContent}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a className={styles.postContainer} href={`/post/${post.uid}`}>
                <h2>{post.data.title}</h2>
                <p>{post.data.subtitle}</p>

                <div className={styles.infoContainer}>
                  {post.first_publication_date && (
                    <span>
                      <FiCalendar fontSize='1.25rem' />
                      {formatPostPublicationDate(post.first_publication_date)}
                    </span>
                  )}

                  <span>
                    <FiUser fontSize='1.25rem' /> {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}

          {hasNextPage && (
            <button type='button' onClick={fetchMorePosts}>
              Carregar mais posts
            </button>
          )}
        </div>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const posts = await prismic.getByType('posts', {
    pageSize: 5,
  });

  return {
    props: {
      postsPagination: {
        next_page: posts.next_page,
        results: posts.results,
      },
    },
    revalidate: TWENTY_FOUR_HOURS,
  };
};
