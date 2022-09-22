import { ArtistProp, TrackObjTypes, TokenProps } from '../types';

// helper function to convert ms to mm:ss (song standard)
export const convertMsToStandardTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  const addZeroMaybe = Number(seconds) < 10 ? '0' : '';
  return `${minutes}:${addZeroMaybe}${seconds}`;
};

// helper function to create track obj
export const createTrackObj = (item: TrackObjTypes) => {
  const { id, name, artists, album } = item;
  const trackObj = {
    id: id,
    name: name,
    artists: artists.map((artist: ArtistProp) => artist.name),
    image: album.images[2].url,
  };

  return trackObj;
};

export const createTokenObj = (data: TokenProps) => {
  const {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
  } = data;
  const tokenObj = {
    token: accessToken,
    tokenExpires: expiresIn,
    refreshToken: refreshToken,
    timeStamp: Date.now(),
  };

  return tokenObj;
};
