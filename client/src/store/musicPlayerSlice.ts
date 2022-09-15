import { createSlice } from '@reduxjs/toolkit';

type PlaylistProps = {
  name: string;
  id: string;
};

type PlaylistSongProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: OutputTrackProps[];
};

type OutputTrackProps = {
  album: string;
  artists: string[];
  context_uri: string;
  duration: number;
  id: string;
  image: string;
  name: string;
  track_number: number;
};

type CurrentTrackProps = {
  id: string;
  name: string;
  artists: string[];
  image: string;
};

type MusicPlayerTypes = {
  playlist: PlaylistProps[];
  selectedPlaylist: string;
  playlistSongs: PlaylistSongProps;
  currentTrack: CurrentTrackProps;
};

const initialState = {
  playlist: [],
  selectedPlaylist: '',
  playlistSongs: {},
  currentTrack: {},
} as unknown as MusicPlayerTypes;

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
  },
});

// export const musicPlayerState = (state: RootState) => state;
export const {
  setPlaylist,
  setSelectedPlaylist,
  setPlaylistSongs,
  setCurrentTrack,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
