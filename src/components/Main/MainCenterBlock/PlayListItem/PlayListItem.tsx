"use client"
import styles from '../MainCenterBlock.module.css'
import { TrackType } from "@/components/SharedTypes/SharedTypes";
import {formatTime} from "@/components/utils/Utils"

type PlayListItemProps = {
  item: TrackType;
};

export default function PlayListItem({item}: PlayListItemProps) {
    return (
          <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image }>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link } href="http://">
                              {item.name} <span className={styles.track__title_span } />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            {item.author}
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                          {item.album}
                          </a>
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
