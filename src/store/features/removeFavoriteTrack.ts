import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeLike, getFavoriteTracks } from '@/services/tracks/tracksApi';
import { MusicData } from '@/sharedTypes/sharedTypes';

export const removeFavoriteTrack = createAsyncThunk<
  MusicData[],
  { access: string; id: number },
  { rejectValue: string }
>('tracks/removeFavoriteTrack', async ({ access, id }, thunkAPI) => {
  try {
    await removeLike(access, id);
    const favoriteTracks = await getFavoriteTracks(access);
    return favoriteTracks;
  } catch {
    return thunkAPI.rejectWithValue('Ошибка удаления лайка');
  }
});
