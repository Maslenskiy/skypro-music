"use client"
import styles from '../MainCenterBlock.module.css'
import { TrackType } from "@/components/SharedTypes/SharedTypes";
import {formatTime} from "@/components/utils/Utils"
import { useAppDispatch, useAppSelector} from '@/store/store';
import { setCurrentTrack, setIsPlay} from '@/store/features/trackSlice';

type PlayListItemProps = {
  item: TrackType;
};

export default function PlayListItem({item}: PlayListItemProps) {
const dispatch = useAppDispatch();
const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
const isPlay = useAppSelector((state) => state.tracks.isPlay);

// Проверяем, является ли текущий трек активным и играет ли он
const isCurrentTrackPlaying = currentTrack?._id === item._id && isPlay;
const isCurrentTrackSelected = currentTrack?._id === item._id;

// Определяем класс для иконки трека
const getTrackImageClass = () => {
  if (isCurrentTrackPlaying) {
    return `${styles.track__title_image} ${styles.track__title_image_playing}`;
  } else if (isCurrentTrackSelected) {
    return `${styles.track__title_image} ${styles.current_track_paused}`;
  }
  return styles.track__title_image;
};

 const onClickTrack = () =>{
  dispatch(setCurrentTrack(item))
}

const onClickIcon = () => {
  if (currentTrack?._id === item._id) {
    dispatch(setIsPlay(!isPlay));
  } else {
    dispatch(setCurrentTrack(item));
    dispatch(setIsPlay(true));
  }
}

    return (
          <div className={styles.playlist__item} onClick={onClickTrack}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div 
                            className={getTrackImageClass()}
                            onClick={(e) => {
                              e.stopPropagation(); // Предотвращаем всплытие события
                              onClickIcon();
                            }}
                          >
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <span 
                              className={styles.track__title_link}
                              onClick={(e) => {
                                e.stopPropagation(); // Предотвращаем всплытие события
                                onClickIcon();
                              }}
                            >
                              {item.name} <span className={styles.track__title_span } />
                            </span>
                            {/* Фиолетовая точка для текущего трека */}
                            {currentTrack?._id === item._id && (
                              <div className={`${styles.current_track_dot} ${isPlay ? styles.current_track_dot_playing : ''}`}></div>
                            )}
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <span className={styles.track__author_link}>
                            {item.author }
                          </span>
                        </div>
                        <div className={styles.track__album }>
                          <span className={styles.track__album_link}>
                          {item.album}
                          </span>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className={styles.track__time_text}>{formatTime(item.duration_in_seconds)}</span>
                        </div>
                      </div>
                    </div>
    )
}
