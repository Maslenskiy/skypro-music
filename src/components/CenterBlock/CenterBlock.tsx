'use client';
import { MusicData } from '@/sharedTypes/sharedTypes';
import styles from './centerblock.module.css';
import { ReactNode, useEffect } from 'react';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import Tracks from '../Tracks/Tracks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setPagePlaylist } from '@/store/features/trackSlice';

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
  pagePlaylist?: MusicData[];
}) {
  const { allTracks } = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoading && !errorRes) {
      dispatch(setPagePlaylist(allTracks));
    }
  }, [dispatch, isLoading, errorRes, allTracks]);
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>

      {isLoading}
      {errorRes && <p className={styles.error}>{errorRes}</p>}

      <Filter />
      <div className={styles.centerblock__content}>
        <FilterItem />

        <Tracks tracks={tracks} loading={!!isLoading} />
      </div>
    </div>
  );
}
