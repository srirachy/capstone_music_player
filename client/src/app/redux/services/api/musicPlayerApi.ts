import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createTrackObj } from 'src/utils/Functions';
import { ArtistProp, PlaylistItemsType, SongType, TrackType } from 'src/common/models';

const PORT = process.env.PORT || 9000;

export const musicPlayerApi = createApi({
  reducerPath: 'musicPlayerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${PORT}`,
  }),
  tagTypes: ['CurrentTrack', 'Playlist', 'Shuffle', 'Repeat', 'Volume'],
  endpoints: build => ({
    fetchCurrentTrack: build.query<unknown, void>({
      query: () => '/auth/me/player/currently-playing',
      providesTags: ['CurrentTrack'],
      transformResponse: ({ item, is_playing: isPlaying }) => {
        if (item) {
          const currentTrackObj = createTrackObj(item); // could include duration_ms if want to implement feature to update next song when ended
          return { currentTrackObj, isPlaying };
        }
        return null;
      },
    }),
    fetchNextOrPrevTrack: build.mutation<unknown, unknown>({
      query: (buttonPressed: string) => ({
        url: `/auth/me/player/${buttonPressed}`,
        method: 'GET',
      }),
      invalidatesTags: ['CurrentTrack'],
    }),
    fetchUserPlaylists: build.query<unknown, void>({
      query: () => '/auth/me/playlist',
      providesTags: ['Playlist'], // tag for Playlist when feature to create playlists becomes available
      transformResponse: ({ items }) => {
        const playlists = items.map(({ name, id }: PlaylistItemsType) => {
          return { name, id };
        });
        const initPlaylist = items[0].id;
        return { playlists, initPlaylist };
      },
    }),
    fetchSelectedPlaylistSongs: build.query<unknown, unknown>({
      query: (selectedPlaylist: string) => `/auth/playlists/${selectedPlaylist}`,
      transformResponse: ({ id, name, description, images, tracks }) => {
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
    fetchPauseOrPlay: build.mutation<unknown, unknown>({
      query: (curState: string) => ({
        url: `/auth/v1/me/player/${curState}`,
        method: 'GET',
      }),
      invalidatesTags: ['CurrentTrack'],
    }),
    fetchShuffle: build.mutation<unknown, unknown>({
      query: (shuffState: string) => ({
        url: `/auth/shuffle/${shuffState}`,
        method: 'GET',
      }),
    }),
    fetchRepeat: build.mutation<unknown, unknown>({
      query: (repState: string) => ({
        url: `/auth/repeat/${repState}`,
        method: 'GET',
      }),
    }),
    fetchVolume: build.mutation<unknown, unknown>({
      query: (curVol: string) => `/auth/volume/${+curVol}`,
    }),
    fetchSong: build.mutation<unknown, SongType>({
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
