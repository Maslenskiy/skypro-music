import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "@/components/SharedTypes/SharedTypes";

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay:boolean
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay:false
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrentTrack: (state, action:PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action:PayloadAction<boolean>) =>{
        state.isPlay = action.payload
    }
  },
});

export const { setCurrentTrack, setIsPlay } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;