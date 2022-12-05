import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArtistProp, PlaylistItemsType, SongType, TrackType } from 'src/common/models';
import { createTrackObj } from 'src/utils/Functions';

const PORT = process.env.PORT || 9000;

export const api = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://localhost:${PORT}` }),
  endpoints: build => ({
    fetchCurrentTrack: build.query<unknown, unknown>({
      query: () => '/auth/me/player/currently-playing',
      transformResponse: ({ item, is_playing: isPlaying }) => {
        const currentTrackObj = createTrackObj(item);
        return { currentTrackObj, isPlaying };
      },
    }),
    fetchNextOrPrevTrack: build.query<unknown, unknown>({
      query: (buttonPressed: string) => `/auth/me/player/${buttonPressed}`,
    }),
    fetchUserPlaylist: build.query<unknown, unknown>({
      query: () => '/auth/me/playlist',
      transformResponse: ({ items }) => {
        const playlists = items.map(({ name, id }: PlaylistItemsType) => {
          return { name, id };
        });
        const initPlaylist = items[0].id;
        return { playlists, initPlaylist };
      },
    }),
    fetchSelectedPlaylist: build.query<unknown, unknown>({
      query: (selectedPlaylist: string) => `/auth/playlists/${selectedPlaylist}`,
      transformResponse: ({ id, name, description, images, tracks }) => {
        const songData = {
          id: id,
          name: name,
          description: description.startsWith('<a') ? '' : description,
          image: images[0].url,
          tracks: tracks.items.map(({ track }: TrackType) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist: ArtistProp) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        return songData;
      },
    }),
    fetchPauseOrPlay: build.query<unknown, unknown>({
      query: (curState: string) => `/auth/v1/me/player/${curState}`,
      transformResponse: ({ curState }) => {
        return curState === 'play';
      },
    }),
    fetchShuffle: build.query<unknown, unknown>({
      query: (shuffState: string) => `/auth/shuffle/${shuffState}`,
      transformResponse: ({ shuffState }) => {
        return shuffState === 'true';
      },
    }),
    fetchRepeat: build.query<unknown, unknown>({
      query: (repState: string) => `/auth/repeat/${repState}`,
      // transformResponse: ({ repState }) => {
      //   return repState; // is this necessary to transform if returning repState?
      // },
    }),
    fetchVolume: build.query<unknown, unknown>({
      query: (curVol: string) => `/auth/volume/${+curVol}`,
      transformResponse: ({ curVol }) => {
        return +curVol;
      },
    }),
    fetchSong: build.query<unknown, unknown>({
      query: ({ uri, trackNum }: SongType) => `/auth/play/${uri}/${trackNum}`,
      transformResponse: ({ status }) => {
        return status === 204; // is this a good conversion from thunk?
      },
    }),
  }),
});

export const {
  useFetchCurrentTrackQuery,
  useFetchNextOrPrevTrackQuery,
  useFetchUserPlaylistQuery,
  useFetchSelectedPlaylistQuery,
  useFetchPauseOrPlayQuery,
  useFetchShuffleQuery,
  useFetchRepeatQuery,
  useFetchVolumeQuery,
  useFetchSongQuery,
} = api;
