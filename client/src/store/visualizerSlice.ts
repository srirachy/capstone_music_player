import { createSlice } from '@reduxjs/toolkit';
import { VizSongType } from '../types';

const initialState = {
  vizSong: "dreamin'",
  trackChange: false,
} as VizSongType;

export const visualizerSlice = createSlice({
  name: 'visualizer',
  initialState,
  reducers: {
    setVizSong(state, { payload }) {
      state.vizSong = payload;
    },
    setTrackChange(state, { payload }) {
      state.trackChange = payload;
    },
  },
});

export const { setVizSong, setTrackChange } = visualizerSlice.actions;
export default visualizerSlice.reducer;
