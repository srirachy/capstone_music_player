import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTrackObj } from 'src/utils/Functions';
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
  musicIsPlaying: false,
  trackTrigger: true,
  repeatState: '',
  shuffleState: false,
} as unknown as MusicPlayerTypes;

export const fetchCurrentTrack = createAsyncThunk(
  'musicPlayer/fetchCurrentTrack',
  async () => {
    const res = await fetch('auth/me/player/currently-playing');
    const resData = await res.json();
    const { item, is_playing: isPlaying } = resData;
    const currentTrackObj = createTrackObj(item);
    return { currentTrackObj, isPlaying };
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

export const fetchPauseOrPlay = createAsyncThunk(
  'musicPlayer/fetchPauseOrPlay',
  async (curState: string) => {
    const pauseOrPlay = curState;
    await fetch(`/auth/v1/me/player/${pauseOrPlay}`);
  },
);

export const fetchShuffle = createAsyncThunk(
  'musicPlayer/fetchShuffle',
  async (shuffState: string) => {
    await fetch(`/auth/shuffle/${shuffState}`);
  },
);

export const fetchRepeat = createAsyncThunk(
  'musicPlayer/fetchRepeat',
  async (repState: string) => {
    await fetch(`/auth/repeat/${repState}`);
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
    setShuffleState(state, { payload }) {
      state.shuffleState = payload;
    },
    setRepeatState(state, { payload }) {
      state.repeatState = payload;
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
        state.trackTrigger = false;
        state.currentTrack = payload.currentTrackObj;
        state.musicIsPlaying = payload.isPlaying;
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
        state.trackTrigger = true;
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
      })
      .addCase(fetchPauseOrPlay.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchPauseOrPlay.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchPauseOrPlay.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchShuffle.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchShuffle.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchShuffle.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchRepeat.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchRepeat.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchRepeat.rejected, (state) => {
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
  setShuffleState,
  setRepeatState,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
