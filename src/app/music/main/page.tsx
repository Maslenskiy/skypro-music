'use client';

import CenterBlock from '@/components/CenterBlock/CenterBlock';

import { useAppSelector } from '@/store/store';

export default function MainPage() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  const title = fetchIsLoading
    ? 'Загрузка...'
    : fetchError
      ? fetchError
      : 'Треки';

  return (
    <CenterBlock
      tracks={allTracks}
      isLoading={fetchIsLoading}
      errorRes={fetchError}
      title={title}
    />
  );
}
