import { MutableRefObject } from 'react';
import * as THREE from 'three';
import { Vector3 } from '@react-three/fiber';

// type for app
export type PlaybackType = {
  token: string;
};

// type for webplayer
export type ListenerEventType = {
  device_id: string;
};

// type for playlist
export type PlaylistItemsType = {
  name: string;
  id: string;
};

// type for NavBar
export type NavBkgdType = {
  navBackground: boolean;
};

// types SpotifyContent
type TrackProps = {
  id: string;
  name: string;
  artists: ArtistProp[];
  image: string;
  duration_ms: number;
  album: AlbumProps;
  context_uri: string;
  track_number: number;
};

export type AlbumProps = {
  images: ImagesProp[];
  name: string;
  uri: string;
};

type ImagesProp = {
  url: string;
};

export type TrackType = {
  track: TrackProps;
};

export type ArtistProp = {
  name: string;
};

export type HeaderBkgdType = {
  headerBackground: boolean;
};

// types musicPlayerSlice
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

export type CurrentTrackProps = {
  id: string;
  name: string;
  artists: string[];
  image: string;
};

export type MusicPlayerTypes = {
  loading: boolean;
  error: boolean;
  playlist: PlaylistProps[];
  selectedPlaylist: string;
  playlistSongs: PlaylistSongProps;
  currentTrack: CurrentTrackProps;
  prevOrNextStatus: number;
  musicIsPlaying: boolean;
  trackTrigger: boolean;
  shuffleState: boolean;
  repeatState: string;
  musicVolume: number;
};

// types tokenSlice
type TokenObjProps = {
  token: string;
  tokenExpires: number;
  refreshToken: string;
  timeStamp: number;
};

export type TokenTypes = {
  loading: boolean;
  error: boolean;
  musicOrLogin: boolean;
  tokenObj: TokenObjProps;
};

export type TokenProps = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

// types userSlice
type UserProps = {
  userId: string;
  userName: string;
};

export type UserTypes = {
  loading: boolean;
  error: boolean;
  userInfo: UserProps;
};

// types themeSlice
export type ThemeTypes = {
  themeState: string;
};

export type RadioProps = {
  value: string;
  selected: string;
};

export type LabelTypes = {
  title: string;
  id: string;
  onChange: (val: string) => void;
};

// types visualizerSlice
export type VizSongType = {
  vizSong: string;
};

// types toggle switch
export type ToggleProps = {
  vals: string[];
  curSelect: string;
};

// utils/Functions types
export type TrackObjTypes = {
  id: string;
  name: string;
  artists: [];
  album: AlbumProps;
};

// VisualizerTheme Type
export type SoundRefType = {
  sound: MutableRefObject<null>;
};

// VisualizerSphere types
export type SphereProps = {
  sound: MutableRefObject<SoundRefType>;
  angle: number;
  position: Vector3 | undefined;
  radius: number;
  index: number;
};

// VisualizerAnalyzer types
export type AnalyzerProps = {
  sound: MutableRefObject<any>; // can't do better than any here for now
  index: number;
  mesh: MutableRefObject<
    THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material | THREE.Material[]
    >
  >;
};

// VizMenu types
export type VizMenuProps = {
  id: string;
  songName: string;
  createClickHandler: () => void;
  index: number;
};
