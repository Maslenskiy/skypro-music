'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearchQuery } from '@/store/features/trackSlice';
import styles from './search.module.css';

export default function Search() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tracks.searchQuery);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchQuery}
        onChange={onSearchInput}
      />
    </div>
  );
}
