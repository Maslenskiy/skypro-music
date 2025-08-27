import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicData } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: null | MusicData;
  isPlay: boolean;
  isShuffle: boolean;
  shuffledPlaylist: MusicData[];
  tracks: MusicData[];
  allTracks: MusicData[];
  filteredTracks: MusicData[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  activeFilter: string | null;
  filterValue: string | null;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  tracks: [],
  shuffledPlaylist: [],
  allTracks: [],
  filteredTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  activeFilter: null,
  filterValue: null,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<MusicData>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<MusicData[]>) => {
      state.tracks = action.payload;
      state.shuffledPlaylist = [...state.tracks].sort(
        () => Math.random() - 0.5,
      );
      // Обновляем отфильтрованные треки при смене подборки
      state.filteredTracks = action.payload;
      // Сбрасываем активный фильтр при смене подборки
      state.activeFilter = null;
      state.filterValue = null;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      if (state.currentTrack && state.tracks.length > 0) {
        const playlist = state.isShuffle
          ? state.shuffledPlaylist
          : state.tracks;
        const curIndex = state.tracks.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const nextIndex = curIndex + 1;

        if (nextIndex >= playlist.length) return;

        state.currentTrack = playlist[nextIndex];
      }
    },
    setPrevTrack: (state) => {
      if (state.currentTrack && state.tracks.length > 0) {
        const curIndex = state.tracks.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const prevIndex = curIndex - 1;

        if (prevIndex < 0) return;

        state.currentTrack = state.tracks[prevIndex];
      }
    },
    setAllTracks: (state, action: PayloadAction<MusicData[]>) => {
      state.allTracks = action.payload;
      state.filteredTracks = action.payload; // Инициализируем отфильтрованные треки
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ type: string; value: string }>) => {
      state.activeFilter = action.payload.type;
      state.filterValue = action.payload.value;
      
      // Применяем фильтр к текущим трекам (подборки), а не ко всем трекам
      const tracksToFilter = state.tracks.length > 0 ? state.tracks : state.allTracks;
      
      if (action.payload.value) {
        switch (action.payload.type) {
          case 'author':
            state.filteredTracks = tracksToFilter.filter(
              track => track.author.toLowerCase().includes(action.payload.value.toLowerCase())
            );
            break;
          case 'genre':
            state.filteredTracks = tracksToFilter.filter(
              track => track.genre.some(g => g.toLowerCase().includes(action.payload.value.toLowerCase()))
            );
            break;
          case 'year':
            state.filteredTracks = tracksToFilter.filter(
              track => new Date(track.release_date).getFullYear().toString() === action.payload.value
            );
            break;
          default:
            state.filteredTracks = tracksToFilter;
        }
      } else {
        state.filteredTracks = tracksToFilter;
      }
    },
    clearFilter: (state) => {
      state.activeFilter = null;
      state.filterValue = null;
      // Возвращаемся к текущим трекам (подборки), а не ко всем трекам
      state.filteredTracks = state.tracks.length > 0 ? state.tracks : state.allTracks;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFilter,
  clearFilter,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
