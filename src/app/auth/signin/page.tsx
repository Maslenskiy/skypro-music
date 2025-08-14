'use client';

import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { authUser, getTokens } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setAccessToken, setRefreshToken, setUserName } from '@/store/features/authSlice';

export default function Signin() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }
    setIsLoading(true);

    authUser({ email, password })
      .then(() => {
        dispatch(setUserName(email));
        return getTokens({ email, password });
      })
      .then((res) => {
        console.log(res);
        dispatch(setAccessToken(res.access))
          dispatch(setRefreshToken(res.refresh))
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            setErrorMessage('Отсутствует интернет, повторите попытку позднее');
          } else {
            setErrorMessage('Неизвестная ошибка, повторите попытку позднее');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        placeholder="Почта"
        value={email}
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        type="button"
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
