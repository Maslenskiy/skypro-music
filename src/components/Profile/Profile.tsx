'use client';

import { useAppSelector, useAppDispatch } from '@/store/store';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/store/features/authSlice';

export default function Profile() {
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Очищаем все данные о пользователе
    localStorage.removeItem('username');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    
    // Очищаем Redux store
    dispatch(clearUser());
    
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
