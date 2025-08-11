"use client"
import { useAppSelector, useAppDispatch } from '@/store/store';
import styles from './Bar.module.css';
import { useRef, useEffect } from 'react';
import { setIsPlay } from '@/store/features/trackSlice';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Эффект для автоматического управления воспроизведением
  useEffect(() => {
    if (audioRef.current && currentTrack) {

      if (isPlay) {
        audioRef.current.play().catch((error) => {
          console.error('Ошибка воспроизведения:', error);
          dispatch(setIsPlay(false));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlay, currentTrack, dispatch]);

  if (!currentTrack) return <></>;

  const togglePlayPause = () => {
    dispatch(setIsPlay(!isPlay));
  };

  // Обработчики событий аудио
  const handlePlay = () => dispatch(setIsPlay(true));
  const handlePause = () => dispatch(setIsPlay(false));
  const handleEnded = () => dispatch(setIsPlay(false));

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      ></audio>
      <div className={styles.bar__content}>
        <div className={styles.bar__player_progress} />
        <div className={styles.bar__player_block}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={()=>alert('Еще не реализоввано')} className={styles.player__btn_prev}>
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
              <div className={styles.player__btn_next} onClick={()=>alert('Еще не реализоввано')}>
                <svg className={styles.player__btn_next_svg}>
                  <use xlinkHref="./sprite.svg#icon-next" />
                </svg>
              </div>
              <div className={styles.player__btn_repeat } onClick={()=>alert('Еще не реализоввано')}>
                <svg className={styles.player__btn_repeat_svg}>
                  <use xlinkHref="./sprite.svg#icon-repeat"  />
                </svg>
              </div>
              <div className={styles.player__btn_shuffle} onClick={()=>alert('Еще не реализоввано')}>
                <svg className={styles.player__btn_shuffle_svg}>
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
