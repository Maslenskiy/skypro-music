"use client";
import { Modal } from "@/components/Modal/Modal";
import styles from "../MainCenterBlock.module.css";
import classNames from "classnames";
import { useState } from "react";
import { data } from "@/app/data";
import type { TrackType } from "@/components/SharedTypes/SharedTypes";

export default function FilterCenterBlock() {
  const [openModal, setOpenModal] = useState<null | "artist" | "year" | "genre">(
    null
  );

  const handleClick = (type: "artist" | "year" | "genre") => {
    setOpenModal((prev) => (prev === type ? null : type));
  };

  // Типизация для авторов
  const filterAuthor: string[] = data.map((item: TrackType) => item.author);

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
        исполнитель
        {openModal === "artist" && <Modal  items={filterAuthor}/>}
      </div>
      <div
        onClick={() => handleClick("year")}
        className={classNames(styles.filter__button, styles._btn_text)}
      >
        году выпуска
        {openModal === "year" && <Modal items={['По умолчанию', "Сначала новые", "Сначала старые"]}/>}
      </div>
      <div
        onClick={() => handleClick("genre")}
        className={classNames(styles.filter__button, styles._btn_text)}
      >
        жанру
        {openModal === "genre" && <Modal items={uniqueGenres}/>}
      </div>
    </div>
  );
}
