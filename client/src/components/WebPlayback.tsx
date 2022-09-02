import { useState, useEffect } from 'react';
import { ListenerEventType, PlaybackType } from '../types';

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

function WebPlayback({ token }: PlaybackType) {
  const [player, setPlayer] = useState<undefined | Spotify.Player>(
    undefined,
  );
  const [isPaused, setPaused] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const [currentTrack, setTrack] = useState<typeof track>(track);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const sPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(sPlayer);
    };
  }, [token]);

  useEffect(() => {
    player?.addListener(
      'ready',
      ({ device_id }: ListenerEventType) => {
        console.log('Ready with Device ID', device_id);
      },
    );

    player?.addListener(
      'not_ready',
      ({ device_id }: ListenerEventType) => {
        console.log('Device ID has gone offline', device_id);
      },
    );

    player?.addListener(
      'player_state_changed',
      (state: Spotify.PlaybackState) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player
          .getCurrentState()
          // no-shadow warning
          .then((state: Spotify.PlaybackState | null) => {
            !state ? setActive(false) : setActive(true); // no-unused-expressions warnin
          });
      },
    );

    player?.connect();
  }, [player]);

  if (!isActive) {
    return (
      <div className="container">
        <div className="main-wrapper">
          <b>
            Instance not active. Transfer your playback using your
            Spotify app
          </b>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="main-wrapper">
        <img
          src={currentTrack.album.images[0].url}
          className="now-playing__cover"
          alt=""
        />
        <div className="now-playing__side">
          <div className="now-playing__name">{currentTrack.name}</div>
          <div className="now-playing__artist">
            {currentTrack.artists[0].name}
          </div>

          <button
            className="btn-spotify"
            type="button"
            onClick={() => {
              player?.previousTrack();
            }}
          >
            &lt;&lt;
          </button>

          <button
            className="btn-spotify"
            type="button"
            onClick={() => {
              player?.togglePlay();
            }}
          >
            {isPaused ? 'PLAY' : 'PAUSE'}
          </button>

          <button
            className="btn-spotify"
            type="button"
            onClick={() => {
              player?.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default WebPlayback;
