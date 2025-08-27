import { createAsyncThunk } from '@reduxjs/toolkit';
import { addLike, getFavoriteTracks } from '@/services/tracks/tracksApi';
import { MusicData } from '@/sharedTypes/sharedTypes';

export const addFavoriteTrack = createAsyncThunk<
  MusicData[],
  { access: string; id: number },
  { rejectValue: string }
>('tracks/addFavoriteTrack', async ({ access, id }, thunkAPI) => {
  try {
    await addLike(access, id);
    const favoriteTracks = await getFavoriteTracks(access);
    return favoriteTracks;
  } catch {
    return thunkAPI.rejectWithValue('Ошибка добавления в избранное');
  }
});
