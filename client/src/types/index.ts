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

// types for spotify content
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

// types for musicPlayerSlice
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
};
