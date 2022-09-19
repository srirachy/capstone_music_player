import { useEffect } from 'react';
import {
  setCurrentTrack,
  fetchCurrentTrack,
  setTrackTrigger,
} from 'src/store/musicPlayerSlice';
import { useAppDispatch } from 'src/store/hooks';
import { createTrackObj } from 'src/utils/Functions';
import {
  CurrentTrackContainer,
  TrackWrapper,
  ImageWrapper,
  InfoWrapper,
} from '../../styles/CurrentTrackStyle';
import usePlaylist from '../../utils/usePlaylist';

function CurrentTrack() {
  const dispatch = useAppDispatch();
  const { currentTrack, trackTrigger } = usePlaylist();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const resData = await dispatch(fetchCurrentTrack());
      const data = await resData.payload;
      if (Object.keys(data).length > 0) {
        const { item } = data;
        const currentTrackObj = createTrackObj(item);
        if (Object.keys(currentTrackObj).length > 0) {
          dispatch(setCurrentTrack(currentTrackObj));
          dispatch(setTrackTrigger(false));
        } else {
          dispatch(setCurrentTrack(null));
          dispatch(setTrackTrigger(false));
        }
      }
    };
    if (trackTrigger) {
      getCurrentTrack();
    }
  }, [dispatch, trackTrigger]);

  return (
    <CurrentTrackContainer aria-label="current_track_container">
      {Object.keys(currentTrack).length > 0 && (
        <TrackWrapper>
          <ImageWrapper>
            <img
              src={currentTrack.image}
              alt="current track album art"
            />
          </ImageWrapper>
          <InfoWrapper>
            <h4>{currentTrack.name}</h4>
            {currentTrack.artists && (
              <h6>{currentTrack.artists.join(', ')}</h6>
            )}
          </InfoWrapper>
        </TrackWrapper>
      )}
    </CurrentTrackContainer>
  );
}

export default CurrentTrack;
