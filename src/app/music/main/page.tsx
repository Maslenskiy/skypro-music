'use client';

import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { MusicData } from '@/sharedTypes/sharedTypes';
import { setPagePlaylist } from '@/store/features/trackSlice';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const {
    fetchError,
    fetchIsLoading,
    allTracks,
    filteredTracks,
    filters,
    searchQuery,
  } = useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<MusicData[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hasActiveFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.years.length > 0;

    const baseTracks = hasActiveFilters ? filteredTracks : allTracks;

    const filteredBySearch = baseTracks.filter((track) => {
      const lowerQuery = searchQuery.toLowerCase();
      return (
        track.name.toLowerCase().includes(lowerQuery) ||
        track.author.toLowerCase().includes(lowerQuery) ||
        track.album.toLowerCase().includes(lowerQuery)
      );
    });

    setPlaylist(filteredBySearch);
    dispatch(setPagePlaylist(filteredBySearch));
  }, [dispatch, filters, allTracks, filteredTracks, searchQuery]);

  const title = fetchIsLoading
    ? 'Загрузка...'
    : fetchError
      ? fetchError
      : 'Треки';

  return (
    <CenterBlock
      pagePlaylist={allTracks}
      tracks={playlist}
      isLoading={fetchIsLoading}
      errorRes={fetchError}
      title={title}
    />
  );
}
