import { createSlice } from '@reduxjs/toolkit';
import { VizSongType } from '../../common/models';

const initialState = {
  vizSong: '',
  trackChange: false,
} as VizSongType;

export const visualizerSlice = createSlice({
  name: 'visualizer',
  initialState,
  reducers: {
    setVizSong(state, { payload }) {
      state.trackChange = true;
      state.vizSong = payload;
    },
    setTrackChange(state, { payload }) {
      state.trackChange = payload;
    },
  },
});

export const { setVizSong, setTrackChange } = visualizerSlice.actions;
export default visualizerSlice.reducer;
