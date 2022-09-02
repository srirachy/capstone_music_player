import express from 'express';
import request from 'request';
import { generateRandomString } from './utils/Functions';
import { URLProps } from './types';

const logger = require('morgan');
const dotenv = require('../node_modules/dotenv');

// initializers
const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config({ path: '../.env' });
let accessToken = '';

// middleware
app.use(express.json()); // allows the data in post/put to be parsed and understood by server
app.use(logger('dev')); // setups logging in dev only

// env keys
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;

app.get('/', (_req, res) => {
  res.send('redirecting...');
});

app.get('/auth/login', (_req, res) => {
  const scope = 'streaming user-read-email user-read-private';
  const state = generateRandomString(16);
  const authQueryParameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope: scope,
    redirect_uri: spotifyRedirectUri,
    state: state,
  } as URLProps);

  res.redirect(
    `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`,
  );
});

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
      res.redirect('http://localhost:3000');
    } else {
      console.log(
        error,
        response.body.error,
        response.body.error.error_description,
      );
      res.end();
    }
  });
});

app.get('/auth/token', (_req, res) => {
  res.json({ access_token: accessToken });
});

app.listen(PORT, () => {
  console.log(`listening at localhost port: ${PORT}`);
});
