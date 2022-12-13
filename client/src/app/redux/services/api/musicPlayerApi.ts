import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createTrackObj } from 'src/utils/Functions';
import {
  ArtistProp,
  PlaylistItemsType,
  ResponseCurrentTrack,
  ResponseSongTypes,
  ResponseUserPlaylistTypes,
  ReturnCurrentTrack,
  ReturnSongTypes,
  ReturnUserPlaylistTypes,
  SongType,
  TrackType,
} from 'src/common/models';

const PORT = process.env.PORT || 9000;

export const musicPlayerApi = createApi({
  reducerPath: 'musicPlayerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${PORT}`,
  }),
  tagTypes: ['CurrentTrack', 'Playlist', 'Shuffle', 'Repeat', 'Volume'], // tags are awesome: provides -> query, invalidate -> mutations
  endpoints: build => ({
    // basically type build.query/mutation<type(s)of return, type(s)of query param>
    fetchCurrentTrack: build.query<ReturnCurrentTrack | null, void>({
      query: () => '/auth/me/player/currently-playing',
      providesTags: ['CurrentTrack'],
      transformResponse: ({ item, is_playing: isPlaying }: ResponseCurrentTrack) => {
        if (item) {
          const currentTrackObj = createTrackObj(item); // could include duration_ms if want to implement feature to update next song when ended
          return { currentTrackObj, isPlaying };
        }
        return null;
      },
    }),
    fetchNextOrPrevTrack: build.mutation<void, string>({
      query: (buttonPressed: string) => ({
        url: `/auth/me/player/${buttonPressed}`,
        method: 'GET',
      }),
      invalidatesTags: ['CurrentTrack'],
    }),
    fetchUserPlaylists: build.query<ReturnUserPlaylistTypes, void>({
      query: () => '/auth/me/playlist',
      providesTags: ['Playlist'], // tag for Playlist when feature to create playlists becomes available
      transformResponse: ({ items }: ResponseUserPlaylistTypes) => {
        const playlists = items.map(({ name, id }: PlaylistItemsType) => {
          return { name, id };
        });
        const initPlaylist = items[0].id;
        return { playlists, initPlaylist };
      },
    }),
    fetchSelectedPlaylistSongs: build.query<ReturnSongTypes | null, string>({
      query: (selectedPlaylist: string) => `/auth/playlists/${selectedPlaylist}`,
      transformResponse: ({ id, name, description, images, tracks }: ResponseSongTypes) => {
        if (id) {
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
        }
        return null;
      },
    }),
    fetchPauseOrPlay: build.mutation<void, string>({
      query: (curState: string) => ({
        url: `/auth/v1/me/player/${curState}`,
        method: 'GET',
      }),
      invalidatesTags: ['CurrentTrack'],
    }),
    fetchShuffle: build.mutation<void, string>({
      query: (shuffState: string) => ({
        url: `/auth/shuffle/${shuffState}`,
        method: 'GET',
      }),
    }),
    fetchRepeat: build.mutation<void, string>({
      query: (repState: string) => ({
        url: `/auth/repeat/${repState}`,
        method: 'GET',
      }),
    }),
    fetchVolume: build.mutation<void, string>({
      query: (curVol: string) => `/auth/volume/${+curVol}`,
    }),
    fetchSong: build.mutation<void, SongType>({
      query: ({ uri, trackNum }: SongType) => ({
        url: `/auth/play/${uri}/${trackNum}`,
        method: 'GET',
      }),
      invalidatesTags: ['CurrentTrack'],
    }),
  }),
});

export const {
  useFetchCurrentTrackQuery,
  useFetchNextOrPrevTrackMutation,
  useFetchUserPlaylistsQuery,
  useFetchSelectedPlaylistSongsQuery,
  useFetchPauseOrPlayMutation,
  useFetchShuffleMutation,
  useFetchRepeatMutation,
  useFetchVolumeMutation,
  useFetchSongMutation,
} = musicPlayerApi;
