import { useEffect } from 'react';
import { fetchCurrentTrack } from 'src/store/musicPlayerSlice';
import { useAppDispatch } from 'src/store/hooks';
import {
  CurrentTrackContainer,
  TrackWrapper,
  ImageWrapper,
  InfoWrapper,
} from '../../styles/CurrentTrackStyle';
import usePlaylist from '../../utils/usePlaylist';

function CurrentTrack() {
  const dispatch = useAppDispatch();
  const {
    currentTrack: { name, artists, image },
    trackTrigger,
  } = usePlaylist();

  // fetch current track data on initial render (cuz trackTrigger is initially true) and when trackTrigger is true
  useEffect(() => {
    const getCurrentTrack = async () => {
      await dispatch(fetchCurrentTrack());
    };
    if (trackTrigger) {
      getCurrentTrack();
    }
  }, [dispatch, trackTrigger]);

  return (
    <CurrentTrackContainer aria-label="current_track_container">
      {name && (
        <TrackWrapper>
          <ImageWrapper>
            <img src={image} alt="current track album art" />
          </ImageWrapper>
          <InfoWrapper>
            <h4>{name}</h4>
            {artists && <h6>{artists.join(', ')}</h6>}
          </InfoWrapper>
        </TrackWrapper>
      )}
    </CurrentTrackContainer>
  );
}

export default CurrentTrack;
