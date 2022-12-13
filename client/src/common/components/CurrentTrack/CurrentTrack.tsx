import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import { useFetchCurrentTrackQuery } from 'src/app/redux/services/api/musicPlayerApi';
import { setCurrentTrack } from 'src/app/redux/musicPlayerSlice';
import { CurrentTrackContainer, TrackWrapper, ImageWrapper, InfoWrapper } from 'src/common/styles/CurrentTrackStyle';
import usePlaylist from 'src/utils/usePlaylist';

function CurrentTrack() {
  const dispatch = useAppDispatch();
  const {
    currentTrack: { name, artists, image },
  } = usePlaylist();
  const { data, isSuccess } = useFetchCurrentTrackQuery();

  // fetch current track data on initial render (cuz trackTrigger is initially true) and when trackTrigger is true
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setCurrentTrack(data));
    }
  }, [dispatch, data, isSuccess]);

  return (
    <CurrentTrackContainer aria-label='current_track_container'>
      {name && (
        <TrackWrapper>
          <ImageWrapper>
            <img src={image} alt='current track album art' />
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
