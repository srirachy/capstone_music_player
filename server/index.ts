import express from 'express';

const dotenv = require('../node_modules/dotenv');

console.log(dotenv, ' meow!!!!');
dotenv.config({ path: '../.env' });
const app = express();
const PORT = process.env.PORT || 9000;

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

console.log(app);
console.log(PORT);
console.log(spotifyClientId);
console.log(spotifyClientSecret);

const generateRandomString = function (length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(
      Math.floor(Math.random() * possible.length),
    );
  }

  return text;
};

app.get('/auth/login', (req, res) => {
  console.log(req);
  console.log(res);
  const scope = 'streaming  user-read-email  user-read-private';
  const state = generateRandomString(16);
  const authQueryParameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope,
    redirect_uri: 'http://localhost:3000/auth/callback',
    state,
  } as any);

  res.redirect(
    `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`,
  );
});

app.get('/auth/callback', (req, res) => {
  console.log(req);
  console.log(res);
});

app.listen(PORT, () => {
  console.log(`listening at localhost port: ${PORT}`);
});
