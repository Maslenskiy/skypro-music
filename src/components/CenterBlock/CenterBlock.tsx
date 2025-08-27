'use client';
import { MusicData } from '@/sharedTypes/sharedTypes';
import styles from './centerblock.module.css';
import { ReactNode } from 'react';
import { useAppSelector } from '@/store/store';
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
  // Получаем отфильтрованные треки из Redux store
  const filteredTracks = useAppSelector((state) => state.tracks.filteredTracks);
  const activeFilter = useAppSelector((state) => state.tracks.activeFilter);
  
  // Используем отфильтрованные треки, если есть активный фильтр, иначе используем переданные треки
  const displayTracks = activeFilter && filteredTracks.length > 0 ? filteredTracks : tracks;

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>

      {isLoading}
      {errorRes && <p className={styles.error}>{errorRes}</p>}

      <Filter />
      <div className={styles.centerblock__content}>
        <FilterItem />
      
       <Tracks tracks={displayTracks} /> 
       
      </div>
    </div>
  );
}
