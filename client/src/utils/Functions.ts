import { AlbumProps, ArtistProp } from 'src/types';

type TrackObjTypes = {
  id: string;
  name: string;
  artists: [];
  album: AlbumProps;
};

export const convertMsToStandardTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  const addZeroMaybe = Number(seconds) < 10 ? '0' : '';
  return `${minutes}:${addZeroMaybe}${seconds}`;
};

export const createTrackObj = (item: TrackObjTypes) => {
  const trackObj = {
    id: item.id,
    name: item.name,
    artists: item.artists.map((artist: ArtistProp) => artist.name),
    image: item.album.images[2].url,
  };

  return trackObj;
};
