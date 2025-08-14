import axios from 'axios';
import { BASE_URL } from '../constants';

type authUserProps = {
  email: string;
  password: string;
};
type registerUserProps = {
  email: string;
  password: string;
  username: string;
};
type authUserReturn = { email: string; username: string; _id: number };
type registerUserReturn = { username: string; email: string; _id: number };

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios
    .post(BASE_URL + '/user/login/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const registerUserReturn = (
  data: registerUserProps,
): Promise<registerUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  access: string;
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

export const getTokens = (data: authUserProps): Promise<tokensType> => {
  return axios.post(BASE_URL + '/user/token/', data).then((res) => res.data);
};
export const refreshToken = (refresh: string): Promise<accessTokenType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh/', { refresh })
    .then((res) => res.data);
};
