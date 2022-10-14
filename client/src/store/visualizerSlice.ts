import { createSlice } from '@reduxjs/toolkit';
import { VizSongType } from '../types';

const initialState = {
  vizSong: "dreamin'",
} as VizSongType;

export const visualizerSlice = createSlice({
  name: 'visualizer',
  initialState,
  reducers: {
    setVizSong(state, { payload }) {
      state.vizSong = payload;
    },
  },
});

export const { setVizSong } = visualizerSlice.actions;
export default visualizerSlice.reducer;
