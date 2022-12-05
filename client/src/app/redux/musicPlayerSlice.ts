// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createTrackObj } from 'src/utils/Functions';
// import { ArtistProp, MusicPlayerTypes, PlaylistItemsType, SongType, TrackType } from '../../common/models/index';
import { createSlice } from '@reduxjs/toolkit';
import { MusicPlayerTypes } from '../../common/models/index';

const initialState = {
  loading: true,
  error: false,
  playlist: [],
  selectedPlaylist: '',
  playlistSongs: {},
  currentTrack: {},
  musicIsPlaying: false,
  trackTrigger: true,
  repeatState: '',
  shuffleState: false,
  musicVolume: 0,
} as unknown as MusicPlayerTypes;

// export const fetchCurrentTrack = createAsyncThunk('musicPlayer/fetchCurrentTrack', async () => {
//   const res = await fetch('auth/me/player/currently-playing');
//   const resData = await res.json();
//   const { item, is_playing: isPlaying } = resData;
//   const currentTrackObj = createTrackObj(item);
//   return { currentTrackObj, isPlaying };
// });

// export const fetchNextOrPrevTrack = createAsyncThunk(
//   'musicPlayer/fetchNextOrPrevTrack',
//   async (buttonPressed: string) => {
//     const prevOrNext = buttonPressed;
//     await fetch(`/auth/me/player/${prevOrNext}`);
//   },
// );

// export const fetchUserPlaylist = createAsyncThunk('musicPlayer/fetchUserPlaylist', async () => {
//   const res = await fetch('/auth/me/playlist');
//   const resData = await res.json();
//   const { items } = resData;
//   const playlists = items.map(({ name, id }: PlaylistItemsType) => {
//     return { name, id };
//   });
//   const initPlaylist = items[0].id;
//   return { playlists, initPlaylist };
// });

// export const fetchSelectedPlaylist = createAsyncThunk(
//   'musicPlayer/fetchSelectedPlaylist',
//   async (selectedPlaylist: string) => {
//     const sPlist = selectedPlaylist;
//     const res = await fetch(`/auth/playlists/${sPlist}`);
//     const resData = await res.json();
//     const { id, name, description, images, tracks } = resData;
//     const songData = {
//       id: id,
//       name: name,
//       description: description.startsWith('<a') ? '' : description,
//       image: images[0].url,
//       tracks: tracks.items.map(({ track }: TrackType) => ({
//         id: track.id,
//         name: track.name,
//         artists: track.artists.map((artist: ArtistProp) => artist.name),
//         image: track.album.images[2].url,
//         duration: track.duration_ms,
//         album: track.album.name,
//         context_uri: track.album.uri,
//         track_number: track.track_number,
//       })),
//     };
//     return songData;
//   },
// );

// export const fetchPauseOrPlay = createAsyncThunk('musicPlayer/fetchPauseOrPlay', async (curState: string) => {
//   const pauseOrPlay = curState;
//   await fetch(`/auth/v1/me/player/${pauseOrPlay}`);
//   return pauseOrPlay === 'play';
// });

// export const fetchShuffle = createAsyncThunk('musicPlayer/fetchShuffle', async (shuffState: string) => {
//   await fetch(`/auth/shuffle/${shuffState}`);
//   return shuffState === 'true';
// });

// export const fetchRepeat = createAsyncThunk('musicPlayer/fetchRepeat', async (repState: string) => {
//   await fetch(`/auth/repeat/${repState}`);
//   return repState;
// });

// export const fetchVolume = createAsyncThunk('musicPlayer/fetchVolume', async (curVol: string) => {
//   await fetch(`/auth/volume/${+curVol}`);
//   return +curVol;
// });

// export const fetchSong = createAsyncThunk('musicPlayer/fetchSong', async (songObj: SongType) => {
//   const { uri, trackNum } = songObj;
//   const { status } = await fetch(`/auth/play/${uri}/${trackNum}`);
//   return status === 204;
// });

export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    setSelectedPlaylist(state, { payload }) {
      state.selectedPlaylist = payload;
    },
  },
  // extraReducers(builder) {
  // builder
  // .addCase(fetchCurrentTrack.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchCurrentTrack.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.trackTrigger = false;
  //   state.currentTrack = payload.currentTrackObj;
  //   state.musicIsPlaying = payload.isPlaying;
  // })
  // .addCase(fetchCurrentTrack.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchNextOrPrevTrack.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchNextOrPrevTrack.fulfilled, state => {
  //   state.error = false;
  //   state.loading = false;
  //   state.trackTrigger = true;
  // })
  // .addCase(fetchNextOrPrevTrack.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchUserPlaylist.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchUserPlaylist.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.playlist = payload.playlists;
  //   state.selectedPlaylist = payload.initPlaylist;
  // })
  // .addCase(fetchUserPlaylist.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchSelectedPlaylist.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchSelectedPlaylist.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.playlistSongs = payload;
  // })
  // .addCase(fetchSelectedPlaylist.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchPauseOrPlay.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchPauseOrPlay.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.musicIsPlaying = payload;
  // })
  // .addCase(fetchPauseOrPlay.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchShuffle.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchShuffle.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.shuffleState = payload;
  // })
  // .addCase(fetchShuffle.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchRepeat.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchRepeat.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.repeatState = payload;
  // })
  // .addCase(fetchRepeat.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchVolume.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchVolume.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.musicVolume = payload;
  // })
  // .addCase(fetchVolume.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // })
  // .addCase(fetchSong.pending, state => {
  //   state.error = false;
  //   state.loading = true;
  // })
  // .addCase(fetchSong.fulfilled, (state, { payload }) => {
  //   state.error = false;
  //   state.loading = false;
  //   state.musicIsPlaying = payload;
  // })
  // .addCase(fetchSong.rejected, state => {
  //   state.error = true;
  //   state.loading = false;
  // });
  // },
});

export const { setSelectedPlaylist } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
