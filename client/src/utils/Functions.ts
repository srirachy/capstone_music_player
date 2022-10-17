import { Color } from 'three';
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

export const sphereColor = (angle: number, radius: number) => {
  const fakeColor = radius * 0; // mostly to satisfy unused prop - radius (damned if i do, damned if i don't kinda thing)
  const r =
    +Math.floor((Math.sin(angle - Math.PI) + 1) * 128) + fakeColor;
  const g =
    +Math.floor(
      (Math.sin(angle - Math.PI - (4 * Math.PI) / 3) + 1) * 128,
    ) + fakeColor;
  const b =
    +Math.floor(
      (Math.sin(angle - Math.PI - (2 * Math.PI) / 3) + 1) * 128,
    ) + fakeColor;

  return new Color(`rgb(${r}, ${g}, ${b})`);
};

export const adjustScale = (
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  return (
    ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  );
};

export const whiteSpaceToUnderscore = (songName: string) => {
  return songName.replace(/\s+/g, '_');
};
