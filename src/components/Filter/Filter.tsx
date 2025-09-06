'use client';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './filter.module.css';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYear,
} from '@/store/features/trackSlice';
import { RootState } from '@/store/store';

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const dispatch = useAppDispatch();
  const filters = useSelector((state: RootState) => state.tracks.filters);

  const authorRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);
  const onSelectGenre = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };

  const onSelectYear = (year: number) => {
    dispatch(setFilterYear(year.toString()));
  };

  const allTracks = useSelector((state: RootState) => state.tracks.allTracks);

  const authors = Array.from(
    new Set(allTracks.map((track) => track.author).filter(Boolean)),
  );
  const genres = Array.from(new Set(allTracks.flatMap((track) => track.genre)));
  const years = Array.from(
    new Set(
      allTracks.map((track) => new Date(track.release_date).getFullYear()),
    ),
  ).sort((a, b) => a - b);

  const handleFilterClick = (
    filter: string,
    ref: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      return;
    }

    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }

    setActiveFilter(filter);
  };

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const renderFilterList = (items: (string | number)[], filterType: string) => (
    <div
      className={styles.filter__list}
      style={{
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
      }}
    >
      {items.map((item) => {
        const itemStr = item.toString();
        const isSelected =
          (filterType === 'author' && filters.authors.includes(itemStr)) ||
          (filterType === 'genre' && filters.genres.includes(itemStr)) ||
          (filterType === 'year' && filters.years.includes(itemStr));

        return (
          <div
            key={itemStr}
            className={classNames(styles.filter__listItem, {
              [styles.selected]: isSelected,
            })}
            onClick={() => {
              if (filterType === 'author') onSelectAuthor(itemStr);
              if (filterType === 'genre') onSelectGenre(itemStr);
              if (filterType === 'year') onSelectYear(Number(itemStr));
            }}
          >
            {itemStr}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>

        <div
          ref={authorRef}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'author',
          })}
          onClick={() => handleFilterClick('author', authorRef)}
        >
          исполнителю
        </div>

        <div
          ref={yearRef}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'year',
          })}
          onClick={() => handleFilterClick('year', yearRef)}
        >
          году выпуска
        </div>

        <div
          ref={genreRef}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'genre',
          })}
          onClick={() => handleFilterClick('genre', genreRef)}
        >
          жанру
        </div>
      </div>

      {activeFilter === 'author' && renderFilterList(authors, 'author')}
      {activeFilter === 'year' && renderFilterList(years, 'year')}
      {activeFilter === 'genre' && renderFilterList(genres, 'genre')}
    </>
  );
}
