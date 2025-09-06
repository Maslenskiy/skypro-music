'use client';
import { MusicData } from '@/sharedTypes/sharedTypes';
import styles from './centerblock.module.css';
import { ReactNode } from 'react';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import Tracks from '../Tracks/Tracks';

export default function CenterBlock({
  title,
  tracks,
  isLoading,
  errorRes,
}: {
  title: ReactNode;
  tracks: MusicData[];
  isLoading?: boolean;
  errorRes?: string | null;
}) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>

      {isLoading}
      {errorRes && <p className={styles.error}>{errorRes}</p>}

      <Filter />
      <div className={styles.centerblock__content}>
        <FilterItem />

        <Tracks tracks={tracks} />
      </div>
    </div>
  );
}
