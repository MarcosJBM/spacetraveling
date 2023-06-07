import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { Container } from '../components';
import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
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
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const TWENTY_FOUR_HOURS = 60 * 60 * 24;

export default function Home({ postsPagination }: HomeProps) {
  return (
    <Container>
      <div className={styles.homeContent}>
        {postsPagination.results.map(post => (
          <div className={styles.postContainer} key={post.uid}>
            <h2>{post.data.title}</h2>
            <p>{post.data.subtitle}</p>

            <div className={styles.infoContainer}>
              <span>
                <FiCalendar fontSize='1.25rem' /> {post.first_publication_date}
              </span>
              <span>
                <FiUser fontSize='1.25rem' /> {post.data.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const posts = await prismic.getByType('posts', {
    pageSize: 5,
  });

  const formattedPosts = {
    next_page: posts.next_page,
    results: posts.results.map(post => ({
      ...post,
      first_publication_date: formatPostPublicationDate(
        post.first_publication_date
      ),
    })),
  };

  return {
    props: { postsPagination: formattedPosts },
    revalidate: TWENTY_FOUR_HOURS,
  };
};
