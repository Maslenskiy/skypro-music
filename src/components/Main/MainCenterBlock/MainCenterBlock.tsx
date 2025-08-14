
"use client"
import classNames from "classnames";
import styles from "./MainCenterBlock.module.css";
import PlayListItem from "./PlayListItem/PlayListItem";
import { data } from "@/app/data";
import FilterCenterBlock from "./FilterCenterBlock/FilterCenterBlock";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { setPlaylist } from "@/store/features/trackSlice";
export default function MainCenterBlock() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set the playlist for player logic on mount (could be improved to react to filters)
    dispatch(setPlaylist(data));
  }, [dispatch]);

  return (
    <div className={styles.main__centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="./sprite.svg#icon-search" />
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <FilterCenterBlock />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlist_title__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlist_title__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlist_title__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlist_title__col, styles.col04)}>
            <svg className={styles.playlist_title__svg}>
              <use xlinkHref="./sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((item) => (
            <PlayListItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
