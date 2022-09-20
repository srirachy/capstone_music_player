import express from 'express';
import axios from 'axios';
import { generateRandomString } from './utils/Functions';
import {
  LoginUrlProps,
  CbUrlProps,
  RepUrlProps,
  ShuffUrlProps,
} from './types';

const logger = require('morgan');
const dotenv = require('../node_modules/dotenv');

// initializers
const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config({ path: '../.env' });

// token globals
let accessToken = '';
let expiresIn = 0;
let refreshToken = '';

// middleware
app.use(express.json()); // allows the data in post/put to be parsed and understood by server
app.use(logger('dev')); // setups logging in dev only

// env keys
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;

// redirect endpoint -- mostly a helper route
app.get('/', (_req, res) => {
  res.send('redirecting...');
});

// login endpoint -- user enters login credentials and spotify authorizes via OAuth 2.0
app.get('/auth/login', (_req, res) => {
  const scope = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-position',
    'user-top-read',
    'playlist-read-private',
  ];
  const state = generateRandomString(16);
  const authQueryParameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope: scope.join(' '),
    redirect_uri: spotifyRedirectUri,
    state: state,
  } as LoginUrlProps);

  res.redirect(
    `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`,
  );
});

// callback endpoint -- set token server globals and redirect to homepage
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  const formData = new URLSearchParams({
    code,
    redirect_uri: spotifyRedirectUri,
    grant_type: 'authorization_code',
  } as CbUrlProps).toString();

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: formData,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${spotifyClientId}:${spotifyClientSecret}`,
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    accessToken = response.data.access_token;
    expiresIn = response.data.expires_in;
    refreshToken = response.data.refresh_token;
    res.redirect('http://localhost:3000');
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// token endpoint -- send server globals to front-end
app.get('/auth/token', (_req, res) => {
  const tokenObj = {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
  };
  res.json(tokenObj);
});

// refresh token endpoint -- call endpoint to refresh server globals and send to front-end
app.get('/auth/refresh_token/:rTok', async (req, res) => {
  const { rTok } = req.params;
  const formObj = {
    grant_type: 'refresh_token',
    refresh_token: rTok,
  };
  const formData = new URLSearchParams(formObj).toString();

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: formData,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${spotifyClientId}:${spotifyClientSecret}`,
        ).toString('base64')}`,
      },
    });
    accessToken = response.data.access_token;
    expiresIn = response.data.expires_in;
    res.send({
      access_token: accessToken,
      expires_in: expiresIn,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// userInfo endpoint -- get user data
app.get('/auth/me', async (_req, res) => {
  try {
    await axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        res.json(response.data);
      });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// playlist endpoint -- get user playlists
app.get('/auth/me/playlist', async (_req, res) => {
  try {
    await axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        res.json(response.data);
      });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// selected playlist endpoint -- get playlist song data
app.get('/auth/playlists/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;

  try {
    await axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        res.json(response.data);
      });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// currently playing endpoint -- get data of current song
app.get('/auth/me/player/currently-playing', async (_req, res) => {
  try {
    await axios
      .get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        res.json(response.data);
      });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// next/prev endpoint -- skip to next/previous track
app.get('/auth/me/player/:prevOrNext', async (req, res) => {
  const reqPrevOrNext = req.params.prevOrNext;

  try {
    await axios
      .post(
        `https://api.spotify.com/v1/me/player/${reqPrevOrNext}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        res.end(response.data);
      });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// pause/play endpoint -- pause or play current track
app.get('/auth/v1/me/player/:pauseOrPlay', async (req, res) => {
  const reqPauseOrPlay = req.params.pauseOrPlay;
  try {
    await axios({
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/${reqPauseOrPlay}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      res.end(response.data);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// shuffle endpoint -- toggle shuffle
app.get('/auth/shuffle/:shuffState', async (req, res) => {
  const shState = req.params.shuffState;
  const shuffData = new URLSearchParams({
    state: shState,
  } as ShuffUrlProps).toString(); // need help figuring out how to add data for this call... currently: data: { error: [Object] }... trying to get data: { state: 'true', 'false' }
  try {
    await axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/shuffle',
      data: shuffData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      res.end(response.data);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// repeat endpoint -- toggle repeat
app.get('/auth/repeat/:repState', async (req, res) => {
  const rState = req.params.repState;
  const repData = new URLSearchParams({
    state: rState,
  } as RepUrlProps).toString(); // need help figuring out how to add data for this call also... currently: data: { error: [Object] }... trying to get data: { state: 'track', 'context', 'off' }
  try {
    await axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/repeat',
      data: repData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      res.end(response.data);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`listening at localhost port: ${PORT}`);
});
