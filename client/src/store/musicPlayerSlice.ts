import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MusicPlayerTypes } from '../types/index';

const initialState = {
  loading: true,
  error: false,
  playlist: [],
  playlistData: {},
  selectedPlaylist: '',
  selectedPlaylistData: {},
  playlistSongs: {},
  currentTrack: {},
  currentTrackData: {},
  musicIsPlaying: false,
  trackTrigger: true,
} as unknown as MusicPlayerTypes;

export const fetchCurrentTrack = createAsyncThunk(
  'musicPlayer/fetchCurrentTrack',
  async () => {
    const res = await fetch('auth/me/player/currently-playing');
    const resData = await res.json();
    return resData;
  },
);

export const fetchNextOrPrevTrack = createAsyncThunk(
  'musicPlayer/fetchNextOrPrevTrack',
  async (buttonPressed: string) => {
    const prevOrNext = buttonPressed;
    await fetch(`/auth/me/player/${prevOrNext}`);
  },
);

export const fetchUserPlaylist = createAsyncThunk(
  'musicPlayer/fetchUserPlaylist',
  async () => {
    const res = await fetch('/auth/me/playlist');
    const resData = await res.json();
    return resData;
  },
);

export const fetchSelectedPlaylist = createAsyncThunk(
  'musicPlayer/fetchSelectedPlaylist',
  async (selectedPlaylist: string) => {
    const sPlist = selectedPlaylist;
    const res = await fetch(`/auth/playlists/${sPlist}`);
    const resData = await res.json();
    return resData;
  },
);

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
    setCurrentTrack(state, { payload }) {
      state.currentTrack = payload;
    },
    setPrevOrNext(state, { payload }) {
      state.prevOrNextStatus = payload;
    },
    setMusicIsPlaying(state, { payload }) {
      state.musicIsPlaying = payload;
    },
    setTrackTrigger(state, { payload }) {
      state.trackTrigger = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentTrack.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchCurrentTrack.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.currentTrackData = payload;
      })
      .addCase(fetchCurrentTrack.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchNextOrPrevTrack.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchNextOrPrevTrack.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchNextOrPrevTrack.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchUserPlaylist.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchUserPlaylist.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.playlistData = payload;
      })
      .addCase(fetchUserPlaylist.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSelectedPlaylist.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(
        fetchSelectedPlaylist.fulfilled,
        (state, { payload }) => {
          state.error = false;
          state.loading = false;
          state.selectedPlaylistData = payload;
        },
      )
      .addCase(fetchSelectedPlaylist.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {
  setPlaylist,
  setSelectedPlaylist,
  setPlaylistSongs,
  setCurrentTrack,
  setMusicIsPlaying,
  setTrackTrigger,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
