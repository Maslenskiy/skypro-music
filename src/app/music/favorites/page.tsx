'use client';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { loadFavoriteTracks } from '@/store/features/trackThunks';

export default function FavoritesPage() {
  const { access } = useAppSelector((state) => state.auth);
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !access) {
      router.replace('/login');
    }
  }, [access, mounted, router]);

  useEffect(() => {
    if (access) {
      dispatch(loadFavoriteTracks(access));
    }
  }, [access, dispatch]);

  if (!mounted) return <div>Загрузка...</div>;
  if (!access) return null;

  return (
    <CenterBlock
      title="Мои треки"
      tracks={favoriteTracks}
      isLoading={fetchIsLoading}
      errorRes={
        fetchError ||
        (favoriteTracks.length === 0 ? 'Нет треков в избранном' : null)
      }
    />
  );
}
