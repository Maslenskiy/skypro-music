'use client';

import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSelectionById } from '@/services/tracks/tracksApi';
import { MusicData } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';

export default function PlaylistPage() {
  const params = useParams<{ id: string }>();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [tracks, setTracks] = useState<MusicData[]>([]);
  const id = params.id;

  useEffect(() => {
    if (!id || fetchIsLoading || !allTracks.length) return;

    setIsLoading(true);
    setErrorRes(null);

    getSelectionById(id)
      .then((res) => {
        setTitle(res.name);
        const tracksIds = res.items;
        const resultTracks = allTracks.filter((el) =>
          tracksIds.includes(el._id),
        );
        setTracks(resultTracks);
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response?.data) {
          setErrorRes(error.response.data);
        } else {
          setErrorRes('Ошибка при загрузке плейлиста');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, fetchIsLoading, allTracks]);

  return (
    <CenterBlock
      title={isLoading ? 'Загрузка...' : errorRes || title}
      tracks={tracks}
      errorRes={errorRes || fetchError}
      isLoading={isLoading}
    />
  );
}
