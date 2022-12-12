import { createSlice } from '@reduxjs/toolkit';
import { MusicPlayerTypes } from '../../common/models/index';

const initialState = {
  playlist: [],
  selectedPlaylist: '',
  playlistSongs: {},
  currentTrack: {},
  musicIsPlaying: false,
  repeatState: '',
  shuffleState: false,
  musicVolume: 0,
} as unknown as MusicPlayerTypes;

export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    setSelectedPlaylist(state, { payload }) {
      state.selectedPlaylist = payload;
    },
    setCurrentTrack(state, { payload }) {
      state.currentTrack = payload.currentTrackObj;
      state.musicIsPlaying = payload.isPlaying;
    },
    setUserPlaylists(state, { payload }) {
      state.playlist = payload.playlists;
      state.selectedPlaylist = payload.initPlaylist;
    },
    setPlaylistSongs(state, { payload }) {
      state.playlistSongs = payload;
    },
    setPauseOrPlay(state, { payload }) {
      state.musicIsPlaying = payload;
    },
    setShuffleState(state, { payload }) {
      state.shuffleState = payload === 'true';
    },
    setRepeatState(state, { payload }) {
      state.repeatState = payload;
    },
    setVolumeState(state, { payload }) {
      state.musicVolume = payload;
    },
  },
});

export const {
  setSelectedPlaylist,
  setCurrentTrack,
  setUserPlaylists,
  setPlaylistSongs,
  setPauseOrPlay,
  setShuffleState,
  setRepeatState,
  setVolumeState,
} = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
