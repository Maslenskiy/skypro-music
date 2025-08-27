'use client';

import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import { registerUserReturn } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== repeatPassword) {
      return setErrorMessage('Пароли не совпадают');
    }

    setIsLoading(true);

    try {
      const response = await registerUserReturn({
        email,
        password,
        username: email,
      });
      console.log(response);
      router.push('/music/main');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(
            error.response.data.message || 'Ошибка при регистрации',
          );
        } else if (error.request) {
          setErrorMessage('Нет соединения с сервером');
        } else {
          setErrorMessage('Произошла неизвестная ошибка');
        }
      } else {
        setErrorMessage('Ошибка на клиенте');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
        </div>
      </Link>
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
      <input
        className={styles.modal__input}
        type="password"
        placeholder="Повторите пароль"
        value={repeatPassword}
        onChange={onChangeRepeatPassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        type="button"
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
        disabled={isLoading}
      >
        Зарегистрироваться
      </button>
      <div style={{ marginTop: '16px' }}>
        <Link href="/auth/signin" className={styles.modal__btnBack}>
          Вернуться ко входу
        </Link>
      </div>
    </>
  );
}
