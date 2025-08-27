import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { MusicData } from '@/sharedTypes/sharedTypes';

export const loadFavoriteTracks = createAsyncThunk<
  MusicData[],
  string,
  { rejectValue: string }
>('tracks/loadFavoriteTracks', async (access, thunkAPI) => {
  try {
    const favoriteTracks = await getFavoriteTracks(access);
    return favoriteTracks;
  } catch {
    return thunkAPI.rejectWithValue('Ошибка загрузки избранных треков');
  }
});
