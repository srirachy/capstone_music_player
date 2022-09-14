import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from './index';

type PlaylistProps = {
  name: string;
  id: string;
};

type MusicPlayerTypes = {
  playlist: PlaylistProps[];
  selectedPlaylist: string;
  playlistSongs: {};
};

const initialState = {
  playlist: [],
  selectedPlaylist: '',
  playlistSongs: {},
} as MusicPlayerTypes;

export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    setPlaylist(state, { payload }) {
      state.playlist = payload;
    },
    setSelectedPlaylist(state, { payload }) {
      state.selectedPlaylist = payload;
    },
    setPlaylistSongs(state, { payload }) {
      state.playlistSongs = payload;
    },
  },
});

// export const musicPlayerState = (state: RootState) => state;
export const { setPlaylist, setSelectedPlaylist, setPlaylistSongs } =
  musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
