import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from './index';

type PlaylistProps = {
  name: string;
  id: string;
};

type MusicPlayerTypes = {
  playlist: PlaylistProps[];
};

const initialState = {
  playlist: [],
} as MusicPlayerTypes;

export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    setPlaylist(state, { payload }) {
      state.playlist = payload;
    },
  },
});

// export const musicPlayerState = (state: RootState) => state;
export const { setPlaylist } = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
