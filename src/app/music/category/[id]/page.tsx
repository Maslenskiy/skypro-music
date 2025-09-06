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
  const { allTracks, fetchIsLoading, fetchError, filters, searchQuery } =
    useAppSelector((state) => state.tracks);
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

  const filteredTracks = tracks.filter((track) => {
    const matchesAuthor =
      filters.authors.length === 0 || filters.authors.includes(track.author);
    const matchesGenre =
      filters.genres.length === 0 ||
      track.genre.some((g) => filters.genres.includes(g));
    const matchesYear =
      filters.years.length === 0 ||
      filters.years.includes(
        new Date(track.release_date).getFullYear().toString(),
      );

    return matchesAuthor && matchesGenre && matchesYear;
  });

  const searchFilteredTracks = filteredTracks.filter((track) => {
    const q = searchQuery.toLowerCase();
    return (
      track.name.toLowerCase().includes(q) ||
      track.author.toLowerCase().includes(q) ||
      track.album.toLowerCase().includes(q)
    );
  });

  const hasFiltersOrSearch =
    filters.authors.length > 0 ||
    filters.genres.length > 0 ||
    filters.years.length > 0 ||
    searchQuery.trim() !== '';

  const displayTracks = hasFiltersOrSearch ? searchFilteredTracks : tracks;

  return (
    <CenterBlock
      title={isLoading ? 'Загрузка...' : errorRes || title}
      tracks={displayTracks}
      errorRes={errorRes || fetchError}
      isLoading={isLoading}
      pagePlaylist={tracks}
    />
  );
}
