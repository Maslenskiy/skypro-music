import classNames from 'classnames'
import styles from './MainCenterBlock.module.css'
export default function MainCenterBlock(){
    return(
         <div className={styles.main__centerblock }>
                <div className={styles.centerblock__search }>
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
                <div className={styles.centerblock__filter}>
                  <div className={styles.filter__title}>Искать по:</div>
                  <div className={classNames(styles.filter__button, styles._btn_text)}>
                    исполнителю
                  </div>
                  <div className={classNames(styles.filter__button, styles._btn_text)}>
                    году выпуска
                  </div>
                  <div className={classNames(styles.filter__button, styles._btn_text)}>жанру</div>
                </div>
                <div className={styles.centerblock__content}>
                  <div className={styles.content__title }>
                    <div className={classNames(styles.playlist_title__col, styles.col01)}>Трек</div>
                    <div className={classNames(styles.playlist_title__col, styles.col02)}>Исполнитель</div>
                    <div className={classNames(styles.playlist_title__col, styles.col03)}>Альбом</div>
                    <div className={classNames(styles.playlist_title__col, styles.col04)}>
                      <svg className={styles.playlist_title__svg}>
                        <use xlinkHref="./sprite.svg#icon-watch" />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.content__playlist}>
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
                              Guilt <span className={styles.track__title_span } />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            Nero
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Welcome Reality
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className={styles.track__time_text}>4:44</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }  href="http://">
                              Elektro <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link} href="http://">
                            Dynoro, Outwork, Mr. Gee
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Elektro
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">2:22</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              I’m Fire <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            Ali Bakgor
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            I’m Fire
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">2:22</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Non Stop
                              <span className={styles.track__title_span } >(Remix)</span>
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            Стоункат, Psychopath
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Non Stop
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">4:12</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Run Run
                              <span className={styles.track__title_span } >(feat. AR/CO)</span>
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            Jaded, Will Clarke, AR/CO
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Run Run
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">2:54</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Eyes on Fire
                              <span className={styles.track__title_span } >
                                (Zeds Dead Remix)
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            Blue Foundation, Zeds Dead
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Eyes on Fire
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">5:20</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Mucho Bien
                              <span className={styles.track__title_span } >
                                (Hi Profile Remix)
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            HYBIT, Mr. Black, Offer Nissim, Hi Profile
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Mucho Bien
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">3:41</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Knives n Cherries
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            minthaze
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Captivating
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">1:48</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Knives n Cherries
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            minthaze
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Captivating
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">1:48</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Knives n Cherries
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            minthaze
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Captivating
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">1:48</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Knives n Cherries
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            minthaze
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Captivating
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">1:48</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Knives n Cherries
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            minthaze
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Captivating
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">1:48</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Knives n Cherries
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            minthaze
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Captivating
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">1:48</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Knives n Cherries
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            minthaze
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Captivating
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">1:48</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              How Deep Is Your Love
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            Calvin Harris, Disciples
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            How Deep Is Your Love
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">3:32</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              Morena <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://">
                            Tom Boxer
                          </a>
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://">
                            Soundz Made in Romania
                          </a>
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text">3:36</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.playlist__item}>
                      <div className={styles.playlist__track}>
                        <div className={styles.track__title}>
                          <div className={styles.track__title_image}>
                            <svg className={styles.track__title_svg}>
                              <use xlinkHref="./sprite.svg#icon-note" />
                            </svg>
                          </div>
                          <div className="track__title-text">
                            <a className={styles.track__title_link }href="http://">
                              <span className={styles.track__title_span }  />
                            </a>
                          </div>
                        </div>
                        <div className={styles.track__author }>
                          <a className={styles.track__author_link}href="http://" />
                        </div>
                        <div className={styles.track__album }>
                          <a className={styles.track__album_link} href="http://" />
                        </div>
                        <div className="track__time">
                          <svg className={styles.track__time_svg}>
                            <use xlinkHref="./sprite.svg#icon-like" />
                          </svg>
                          <span className="track__time-text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}