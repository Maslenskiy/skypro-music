import axios from 'axios';
import { BASE_URL } from '../constants';
import { MusicData } from '@/sharedTypes/sharedTypes';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getTracks = (): Promise<MusicData[]> => {
  return api
    .get('/catalog/track/all/')
    .then((res) => res.data.data)
    .catch((err) => {
      throw err;
    });
};

export const getSelectionById = async (
  id: string,
): Promise<{ name: string; items: number[] }> => {
  const response = await api.get(`/catalog/selection/${id}/`);
  const data = response.data.data;

  if (!data) {
    throw new Error(`Плейлист с ID ${id} не найден`);
  }

  return { name: data.name, items: data.items };
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    `${BASE_URL}/catalog/track/${id}/favorite/`,
    {},
    { headers: { Authorization: `Bearer ${access}` } },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(`${BASE_URL}/catalog/track/${id}/favorite/`, {
    headers: { Authorization: `Bearer ${access}` },
  });
};

export const getFavoriteTracks = async (
  access: string,
): Promise<MusicData[]> => {
  const response = await axios.get(`${BASE_URL}/catalog/track/favorite/all/`, {
    headers: { Authorization: `Bearer ${access}` },
  });
  return response.data.data;
};
