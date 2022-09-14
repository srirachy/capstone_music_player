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

type AlbumProps = {
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
