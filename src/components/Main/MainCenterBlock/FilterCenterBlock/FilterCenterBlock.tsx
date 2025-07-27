"use client";
import { Modal } from "@/components/Modal/Modal";
import styles from "../MainCenterBlock.module.css";
import classNames from "classnames";
import { useState } from "react";
import { data } from "@/app/data";
import type { TrackType } from "@/components/SharedTypes/SharedTypes";
import CounterBlock from "./CounterBlock/CounterBlock";

export default function FilterCenterBlock() {
  const [openModal, setOpenModal] = useState<
    null | "artist" | "year" | "genre"
  >(null);

  const handleClick = (type: "artist" | "year" | "genre") => {
    setOpenModal((prev) => (prev === type ? null : type));
  };

  // Типизация для авторов
  const filterAuthor: string[] = data.map((item: TrackType) => item.author);
  const uniqueAuthor: string[] = Array.from(new Set(filterAuthor));

  // Типизация для жанров
  const filterGenre: string[] = data.flatMap((item: TrackType) => item.genre);
  const uniqueGenres: string[] = Array.from(new Set(filterGenre));

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div
        onClick={() => handleClick("artist")}
        className={classNames(styles.filter__button, styles._btn_text)}
      >
        {openModal === "artist" && <CounterBlock value={uniqueAuthor.length} />}
        исполнитель
        {openModal === "artist" && <Modal items={uniqueAuthor} />}
      </div>
      <div
        onClick={() => handleClick("year")}
        className={classNames(styles.filter__button, styles._btn_text)}
      >
        {openModal === "year" && <CounterBlock value={3} />}
        году выпуска
        {openModal === "year" && (
          <Modal items={["По умолчанию", "Сначала новые", "Сначала старые"]} />
        )}
      </div>
      <div
        onClick={() => handleClick("genre")}
        className={classNames(styles.filter__button, styles._btn_text)}
      >
        {openModal === "genre" && <CounterBlock value={uniqueGenres.length} />}
        жанру
        {openModal === "genre" && <Modal items={uniqueGenres} />}
      </div>
    </div>
  );
}
