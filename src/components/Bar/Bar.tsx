"use client"
import { useAppSelector, useAppDispatch } from '@/store/store';
import styles from './Bar.module.css';
import { useRef, useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import {
  setIsPlay,
  nextTrack,
  prevTrack,
  toggleShuffle,
  toggleRepeat,
} from '@/store/features/trackSlice';
import { formatTime } from '@/components/utils/Utils';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const isRepeat = useAppSelector((state) => state.tracks.isRepeat);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  // Эффект для автоматического управления воспроизведением
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.loop = isRepeat;
      if (isPlay) {
        audioRef.current
          .play()
          .catch((error) => {
            console.error('Ошибка воспроизведения:', error);
            dispatch(setIsPlay(false));
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlay, currentTrack, isRepeat, dispatch]);

  if (!currentTrack) return <></>;

  const togglePlayPause = () => {
    dispatch(setIsPlay(!isPlay));
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(Math.floor(audioRef.current.currentTime || 0));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(Math.floor(audioRef.current.duration || 0));
    setCurrentTime(Math.floor(audioRef.current.currentTime || 0));
    audioRef.current.volume = volume;
  };

  // Обработчики событий аудио
  const handlePlay = () => dispatch(setIsPlay(true));
  const handlePause = () => dispatch(setIsPlay(false));
  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }
    dispatch(nextTrack());
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = duration * ratio;
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div className={styles.bar__content}>
        <div className={styles.bar__time}>
          {formatTime(currentTime)} / {formatTime(duration || 0)}
        </div>
        <div className={styles.bar__player_progress} onClick={handleProgressClick}>
          <div
            className={styles.bar__player_progress_fill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={styles.bar__player_block}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={() => dispatch(prevTrack())} className={styles.player__btn_prev}>
                <svg className={styles.player__btn_prev_svg}>
                  <use xlinkHref="./sprite.svg#icon-prev" />
                </svg>
              </div>
              <div className={styles.player__btn_play} onClick={togglePlayPause}>
                <svg className={styles.player__btn_play_svg}>
                  {isPlay ? (
                    <use xlinkHref="./sprite.svg#icon-pause" />
                  ) : (
                    <use xlinkHref="./sprite.svg#icon-play" />
                  )}
                </svg>
              </div>
              <div className={styles.player__btn_next} onClick={() => dispatch(nextTrack())}>
                <svg className={styles.player__btn_next_svg}>
                  <use xlinkHref="./sprite.svg#icon-next" />
                </svg>
              </div>
              <div className={styles.player__btn_repeat } onClick={() => dispatch(toggleRepeat())}>
                <svg className={`${styles.player__btn_repeat_svg} ${isRepeat ? styles.icon_active : ''}`}>
                  <use xlinkHref="./sprite.svg#icon-repeat"  />
                </svg>
              </div>
              <div className={styles.player__btn_shuffle} onClick={() => dispatch(toggleShuffle())}>
                <svg className={`${styles.player__btn_shuffle_svg} ${isShuffle ? styles.icon_active : ''}`}>
                  <use xlinkHref="./sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <div className={styles.player__track_play}>
              <div className={styles.track_play__contain}>
                <div className={styles.track_play__image}>
                  <svg className={styles.track_play__svg}>
                    <use xlinkHref="./sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.track_play__author}>
                  <span className={styles.track_play__author_link}>
                    {currentTrack?.name || 'Название трека'}
                  </span>
                </div>
                <div className={styles.track_play__album}>
                  <span className={styles.track_play__album_link}>
                    {currentTrack?.author || 'Автор'}
                  </span>
                </div>
              </div>
              <div className={styles.track_play__like_dis}>
                <div className={styles.track_play__like}>
                  <svg className={styles.track_play__like_svg}>
                    <use xlinkHref="./sprite.svg#icon-like" />
                  </svg>
                </div>
                <div className={styles.track_play__dislike}>
                  <svg className={styles.track_play__dislike_svg}>
                    <use xlinkHref="./sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volume_block}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="./sprite.svg#icon-volume" />
                </svg>
              </div>
              <div className={styles.volume__progress}>
                <input
                  className={styles.volume__progress_line}
                  type="range"
                  name="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
