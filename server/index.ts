import express from 'express';
import request from 'request';
import axios from 'axios';
import { generateRandomString } from './utils/Functions';
import { URLProps } from './types';

const logger = require('morgan');
const dotenv = require('../node_modules/dotenv');

// initializers
const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config({ path: '../.env' });
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

// mostly for redirecting
app.get('/', (_req, res) => {
  res.send('redirecting...');
});

// login endpoint
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
  } as URLProps);

  res.redirect(
    `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`,
  );
});

// callback endpoint
app.get('/auth/callback', (req, res) => {
  const { code } = req.query;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotifyRedirectUri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${spotifyClientId}:${spotifyClientSecret}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      accessToken = body.access_token;
      expiresIn = body.expires_in;
      refreshToken = body.refresh_token;
      res.redirect('http://localhost:3000');
    } else {
      console.log(error);
      res.end();
    }
  });
});

// token endpoint
app.get('/auth/token', (_req, res) => {
  const tokenObj = {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
  };
  res.json(tokenObj);
});

// check session

// userInfo endpoint
app.get('/auth/me', (_req, res) => {
  const authMeOptions = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  request.get(authMeOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      console.log(error);
      res.end();
    }
  });
});

// playlist endpoint
app.get('/auth/me/playlist', (_req, res) => {
  const authPlaylistOptions = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  request.get(authPlaylistOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      console.log(error);
      res.end();
    }
  });
});

// get playlist song data
app.get('/auth/playlists/:playlist_id', (req, res) => {
  const playlistId = req.params.playlist_id;

  const authPlaylistOptions = {
    url: `https://api.spotify.com/v1/playlists/${playlistId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  request.get(authPlaylistOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      console.log(error);
      res.end();
    }
  });
});

// get playlist song data
app.get('/auth/me/player/currently-playing', async (_req, res) => {
  await axios
    .get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
});

// skip to next/previous track
app.get('/auth/me/player/:prevOrNext', async (req, res) => {
  const reqPrevOrNext = req.params.prevOrNext;

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
    })
    .catch((err) => {
      console.log(err.response.status, err.response.statusText);
      res.end();
    });
});

app.listen(PORT, () => {
  console.log(`listening at localhost port: ${PORT}`);
});
