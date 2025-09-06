import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { MusicData } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReAuth';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const useLikeTrack = () => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loadingTrackId, setLoadingTrackId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = (track: MusicData) => {
    if (!access) {
      if (errorMsg !== 'Нет авторизации') {
        setErrorMsg('Нет авторизации');
      } else {
        setErrorMsg(null);
        setTimeout(() => setErrorMsg('Нет авторизации'), 0);
      }
      return;
    }

    const isLike = favoriteTracks.some((t) => t._id === track._id);
    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setLoadingTrackId(track._id);
    setErrorMsg(null);

    withReauth(
      (newToken) => actionApi(newToken || access, track._id),
      refresh,
      dispatch,
    )
      .then(() => {
        dispatch(actionSlice(track));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMsg(error.response.data.message);
          } else if (error.request) {
            setErrorMsg('Произошла ошибка. Попробуйте позже');
          } else {
            setErrorMsg('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setLoadingTrackId(null);
      });
  };

  return {
    toggleLike,
    errorMsg,
    loadingTrackId,
  };
};
