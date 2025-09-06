'use client';

import { useAppSelector } from '@/store/store';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const username = useAppSelector((state) => state.auth.username);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('username');

    router.push('/auth/signin');
  };


  return (
    <div className={styles.sidebar__personal}>
      <p className={styles.sidebar__personalName}>{username}</p>
      <button className={styles.sidebar__icon} onClick={handleLogout}>
        <svg>
          <use xlinkHref="/img/icon/sprite.svg#logout"></use>
        </svg>
      </button>
    </div>
  );
}
