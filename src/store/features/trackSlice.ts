import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "@/components/SharedTypes/SharedTypes";

type initialStateType = {
  currentTrack: TrackType | null;
  currentPlaylist: TrackType[];
  isPlay: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  shuffleOrderIds: number[];
  shufflePosition: number;
};

const initialState: initialStateType = {
  currentTrack: null,
  currentPlaylist: [],
  isPlay: false,
  isShuffle: false,
  isRepeat: false,
  shuffleOrderIds: [],
  shufflePosition: 0,
};

function generateShuffledOrder(
  playlist: TrackType[],
  currentTrackId?: number
): number[] {
  const ids = playlist.map((t) => t._id);
  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  if (currentTrackId !== undefined) {
    const idx = ids.indexOf(currentTrackId);
    if (idx > 0) {
      ids.splice(idx, 1);
      ids.unshift(currentTrackId);
    }
  }
  return ids;
}

function findIndexById(
  playlist: TrackType[],
  id: number | undefined
): number {
  if (id === undefined) return -1;
  return playlist.findIndex((t) => t._id === id);
}

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      if (state.isShuffle) {
        const idxInShuffle = state.shuffleOrderIds.indexOf(action.payload._id);
        if (idxInShuffle !== -1) state.shufflePosition = idxInShuffle;
      }
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
      const currentId = state.currentTrack?._id;
      if (state.isShuffle) {
        state.shuffleOrderIds = generateShuffledOrder(action.payload, currentId);
        state.shufflePosition = currentId
          ? state.shuffleOrderIds.indexOf(currentId)
          : 0;
      } else {
        if (
          currentId !== undefined &&
          findIndexById(action.payload, currentId) === -1
        ) {
          state.currentTrack = null;
          state.isPlay = false;
        }
      }
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
      const currentId = state.currentTrack?._id;
      if (state.isShuffle) {
        state.shuffleOrderIds = generateShuffledOrder(
          state.currentPlaylist,
          currentId
        );
        state.shufflePosition = currentId
          ? state.shuffleOrderIds.indexOf(currentId)
          : 0;
      } else {
        state.shuffleOrderIds = [];
        state.shufflePosition = 0;
      }
    },
    toggleRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    nextTrack: (state) => {
      if (!state.currentTrack) return;
      const playlist = state.currentPlaylist;
      if (playlist.length === 0) return;

      if (state.isShuffle) {
        const pos = state.shufflePosition;
        if (pos < state.shuffleOrderIds.length - 1) {
          const nextId = state.shuffleOrderIds[pos + 1];
          const nextIdx = findIndexById(playlist, nextId);
          if (nextIdx !== -1) {
            state.currentTrack = playlist[nextIdx];
            state.shufflePosition = pos + 1;
            state.isPlay = true;
          }
        } else {
          // at end in shuffle, do nothing
        }
      } else {
        const currentIdx = findIndexById(playlist, state.currentTrack._id);
        if (currentIdx !== -1 && currentIdx < playlist.length - 1) {
          state.currentTrack = playlist[currentIdx + 1];
          state.isPlay = true;
        } else {
          // at end in normal order, do nothing
        }
      }
    },
    prevTrack: (state) => {
      if (!state.currentTrack) return;
      const playlist = state.currentPlaylist;
      if (playlist.length === 0) return;

      if (state.isShuffle) {
        const pos = state.shufflePosition;
        if (pos > 0) {
          const prevId = state.shuffleOrderIds[pos - 1];
          const prevIdx = findIndexById(playlist, prevId);
          if (prevIdx !== -1) {
            state.currentTrack = playlist[prevIdx];
            state.shufflePosition = pos - 1;
            state.isPlay = true;
          }
        }
      } else {
        const currentIdx = findIndexById(playlist, state.currentTrack._id);
        if (currentIdx > 0) {
          state.currentTrack = playlist[currentIdx - 1];
          state.isPlay = true;
        }
      }
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setPlaylist,
  toggleShuffle,
  toggleRepeat,
  nextTrack,
  prevTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;