import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicData } from '@/sharedTypes/sharedTypes';
import { loadFavoriteTracks } from './trackThunks';
import { removeFavoriteTrack } from './removeFavoriteTrack';
import { addFavoriteTrack } from './addFavoriteTrack';

type initialStateType = {
  currentTrack: null | MusicData;
  isPlay: boolean;
  isShuffle: boolean;
  shuffledPlaylist: MusicData[];
  tracks: MusicData[];
  favoriteTracks: MusicData[];
  allTracks: MusicData[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  filters: {
    authors: string[];
    genres: string[];
    years: string[];
  };
  pagePlaylist: MusicData[];
  filteredTracks: MusicData[];
  searchQuery: string;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  tracks: [],
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  filters: {
    authors: [],
    genres: [],
    years: [],
  },
  pagePlaylist: [],
  filteredTracks: [],
  searchQuery: '',
};

const applyAllFilters = (state: initialStateType) => {
  state.filteredTracks = state.allTracks.filter((track) => {
    const matchAuthor =
      state.filters.authors.length === 0 ||
      state.filters.authors.includes(track.author);

    const matchGenre =
      state.filters.genres.length === 0 ||
      track.genre.some((g) => state.filters.genres.includes(g));

    const trackYear = new Date(track.release_date).getFullYear().toString();

    const matchYear =
      state.filters.years.length === 0 ||
      state.filters.years.includes(trackYear);

    return matchAuthor && matchGenre && matchYear;
  });
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
        const curIndex = playlist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const nextIndex = curIndex + 1;

        if (nextIndex >= playlist.length) return;

        state.currentTrack = playlist[nextIndex];
      }
    },
    setPrevTrack: (state) => {
      if (state.currentTrack && state.tracks.length > 0) {
        const playlist = state.isShuffle
          ? state.shuffledPlaylist
          : state.tracks;
        const curIndex = playlist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const prevIndex = curIndex - 1;

        if (prevIndex < 0) return;

        state.currentTrack = playlist[prevIndex];
      }
    },
    setAllTracks: (state, action: PayloadAction<MusicData[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<MusicData[]>) => {
      state.favoriteTracks = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<MusicData>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<MusicData>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setPagePlaylist: (state, action) => {
      state.pagePlaylist = action.payload;
    },

    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter(
          (el) => el !== author,
        );
      } else {
        state.filters.authors.push(author);
      }
      applyAllFilters(state);
    },

    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if (state.filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter(
          (el) => el !== genre,
        );
      } else {
        state.filters.genres.push(genre);
      }
      applyAllFilters(state);
    },

    setFilterYear: (state, action: PayloadAction<string>) => {
      const year = action.payload;

      if (state.filters.years.includes(year)) {
        state.filters.years = state.filters.years.filter(
          (y: string) => y !== year,
        );
      } else {
        state.filters.years.push(year);
      }
      applyAllFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addFavoriteTrack.pending, (state) => {
        state.fetchIsLoading = true;
        state.fetchError = null;
      })
      .addCase(addFavoriteTrack.fulfilled, (state, action) => {
        state.favoriteTracks = action.payload;
        state.fetchIsLoading = false;
        state.fetchError = null;
      })
      .addCase(addFavoriteTrack.rejected, (state, action) => {
        state.fetchIsLoading = false;
        state.fetchError = action.payload as string;
      })
      .addCase(loadFavoriteTracks.pending, (state) => {
        state.fetchIsLoading = true;
        state.fetchError = null;
      })
      .addCase(loadFavoriteTracks.fulfilled, (state, action) => {
        state.favoriteTracks = action.payload;
        state.fetchIsLoading = false;
      })
      .addCase(loadFavoriteTracks.rejected, (state, action) => {
        state.fetchIsLoading = false;
        state.fetchError = action.payload as string;
      })

      .addCase(removeFavoriteTrack.pending, (state) => {
        state.fetchIsLoading = true;
        state.fetchError = null;
      })
      .addCase(removeFavoriteTrack.fulfilled, (state, action) => {
        state.favoriteTracks = action.payload;
        state.fetchIsLoading = false;
        state.fetchError = null;
      })
      .addCase(removeFavoriteTrack.rejected, (state, action) => {
        state.fetchIsLoading = false;
        state.fetchError = action.payload as string;
      });
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
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFilterAuthors,
  setFilterGenres,
  setFilterYear,
  setPagePlaylist,
  setSearchQuery,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
