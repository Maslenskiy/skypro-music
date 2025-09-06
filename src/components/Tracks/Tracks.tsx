'use client';
import { formatTime } from '@/utils/helper';
import Link from 'next/link';
import styles from './tracks.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlay,
} from '@/store/features/trackSlice';
import { MusicData } from '@/sharedTypes/sharedTypes';
import { useLikeTrack } from '@/hooks/useLikeTracks';
import { useEffect } from 'react';

type trackProp = {
  tracks: MusicData[] | undefined;
};

export default function Tracks({ tracks }: trackProp) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);
  const { toggleLike, errorMsg, loadingTrackId } = useLikeTrack();

  const onClickTrack = (track: MusicData) => {
    if (!tracks) return;
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(tracks));
    dispatch(setIsPlay(true));
  };

  useEffect(() => {
    if (errorMsg) {
      alert(errorMsg);
    }
  }, [errorMsg]);

  if (!Array.isArray(tracks)) {
    return (
      <div className={styles.content__playlist}>Нет треков для отображения</div>
    );
  }

  return (
    <div className={styles.content__playlist}>
      <div className={styles.scrollContainer}>
        {tracks.map((track, index) => {
          const isLike = favoriteTracks.some((t) => t._id === track._id);
          
          const isLoading = loadingTrackId === track._id;

          return (
            <div
              className={styles.playlist__item}
              onClick={() => onClickTrack(track)}
              key={`${track._id}-${track.name}-${index}`}
            >
              <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                  <div className={styles.track__titleImage}>
                    {currentTrack?._id === track._id ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          isPlay
                            ? styles.rectangleAnimation
                            : styles.rectangleStatic
                        }
                      >
                        <circle cx="8" cy="8" r="8" fill="#B672FF" />
                      </svg>
                    ) : (
                      <svg className={styles.track__titleSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                      </svg>
                    )}
                  </div>
                  <div className="track__title-text">
                    <Link className={styles.track__titleLink} href="">
                      {track.name}
                      <span className={styles.track__titleSpan}></span>
                    </Link>
                  </div>
                </div>
                <div className={styles.track__author}>
                  <Link className={styles.track__authorLink} href="">
                    {track.author}
                  </Link>
                </div>
                <div className={styles.track__album}>
                  <Link className={styles.track__albumLink} href="">
                    {track.album}
                  </Link>
                </div>
                <div className="track__time">
                  <svg
                    className={`${styles.track__timeSvg} ${
                      isLike ? styles.liked : styles.notLiked
                    } ${isLoading ? styles.likePulse : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(track);
                    }}
                  >
                    <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                  </svg>
                  <span className={styles.track__timeText}>
                    {formatTime(track.duration_in_seconds)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
