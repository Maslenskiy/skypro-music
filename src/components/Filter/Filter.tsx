'use client';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './filter.module.css';
import { data } from '@/data';

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const authorRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  const authors = Array.from(
    new Set(data.map((track) => track.author).filter(Boolean)),
  );
  const genres = Array.from(new Set(data.flatMap((track) => track.genre)));
  const years = Array.from(
    new Set(data.map((track) => new Date(track.release_date).getFullYear())),
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

  const renderFilterList = (items: (string | number)[]) => (
    <div
      className={styles.filter__list}
      style={{
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
      }}
    >
      {items.map((item) => (
        <div key={item} className={styles.filter__listItem}>
          {item}
        </div>
      ))}
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

      {activeFilter === 'author' && renderFilterList(authors)}
      {activeFilter === 'year' && renderFilterList(years)}
      {activeFilter === 'genre' && renderFilterList(genres)}
    </>
  );
}
