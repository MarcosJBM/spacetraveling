import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/'>
          <a href='/'>
            <Image
              src='/assets/logo.svg'
              alt='logo'
              width='238px'
              height='26px'
              priority
            />
          </a>
        </Link>
      </div>
    </header>
  );
}
