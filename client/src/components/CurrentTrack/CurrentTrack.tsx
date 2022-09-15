import { useEffect } from 'react';
import { setCurrentTrack } from 'src/store/musicPlayerSlice';
import { useAppDispatch } from 'src/store/hooks';
import {
  CurrentTrackContainer,
  TrackWrapper,
  ImageWrapper,
  InfoWrapper,
} from '../../styles/CurrentTrackStyle';
import { ArtistProp } from '../../types';
import usePlaylist from '../../utils/usePlaylist';

function CurrentTrack() {
  const dispatch = useAppDispatch();
  const playlist = usePlaylist();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await fetch(
        'auth/me/player/currently-playing',
      );
      const resData = await response.json();
      const data = JSON.parse(resData);
      if (Object.keys(data).length > 0) {
        const { item } = data;
        const currentTrackObj = {
          id: item.id,
          name: item.name,
          artists: item.artists.map(
            (artist: ArtistProp) => artist.name,
          ),
          image: item.album.images[2].url,
        };
        console.log(currentTrackObj);
        dispatch(setCurrentTrack(currentTrackObj));
      }
    };
    getCurrentTrack();
  }, [dispatch]);

  return (
    <CurrentTrackContainer aria-label="current_track_container">
      {Object.keys(playlist.currentTrack).length !== 0 && (
        <TrackWrapper>
          <ImageWrapper>
            <img
              src={playlist.currentTrack.image}
              alt="current track album art"
            />
          </ImageWrapper>
          <InfoWrapper>
            <h4>{playlist.currentTrack.name}</h4>
            <h6>{playlist.currentTrack.artists.join(', ')}</h6>
          </InfoWrapper>
        </TrackWrapper>
      )}
    </CurrentTrackContainer>
  );
}

export default CurrentTrack;
