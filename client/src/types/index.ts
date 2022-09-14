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

// types for spotify content
export type TrackProps = {
  id: string;
  name: string;
  artists: ArtistProp[];
  image: string;
  duration_ms: number;
  album: AlbumProps;
  context_uri: string;
  track_number: number;
};

export type TrackType = {
  track: TrackProps;
};

export type AlbumProps = {
  images: ImagesProp[];
  name: string;
  uri: string;
};

export type ImagesProp = {
  url: string;
};

export type ArtistProp = {
  name: string;
};
