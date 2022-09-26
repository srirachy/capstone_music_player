import { ArtistProp, TrackObjTypes, TokenProps } from '../types';

// helper function to convert ms to mm:ss (song standard)
export const convertMsToStandardTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  const addZeroMaybe = Number(seconds) < 10 ? '0' : '';
  return `${minutes}:${addZeroMaybe}${seconds}`;
};

// helper function to create track obj
export const createTrackObj = ({
  id,
  name,
  artists,
  album,
}: TrackObjTypes) => {
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

export const getRefreshToken = () => {
  const persistToken = localStorage.getItem('persist:token');
  if (persistToken) {
    const persistParse = JSON.parse(persistToken);
    const tokenObjParse = JSON.parse(persistParse.tokenObj);
    if (
      !tokenObjParse.refreshToken ||
      tokenObjParse.refreshToken === 'undefined' ||
      Date.now() - Number(tokenObjParse.tokenExpires) / 1000 < 1000
    ) {
      return false; // there is no refreshToken
    }
  }
  return true; // refreshToken found
};

export const hasTokenExpired = (
  token: string,
  timeStamp: number,
  tokenExpires: number,
) => {
  if (!token || !timeStamp) {
    return false;
  }

  const millisecondsElapsed = Date.now() - Number(timeStamp);
  return millisecondsElapsed / 1000 > Number(tokenExpires);
};
