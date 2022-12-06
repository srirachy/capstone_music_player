import { useEffect } from 'react';
// import { fetchCurrentTrack } from 'src/app/redux/musicPlayerSlice';
// import { useAppDispatch } from 'src/app/redux/hooks';
// import { useFetchCurrentTrackMutation } from 'src/app/redux/services/api/api';
import { CurrentTrackContainer, TrackWrapper, ImageWrapper, InfoWrapper } from 'src/common/styles/CurrentTrackStyle';
import usePlaylist from 'src/utils/usePlaylist';
import { useFetchCurrentTrackQuery } from 'src/app/redux/services/api/api';

function CurrentTrack() {
  // const dispatch = useAppDispatch();
  const {
    currentTrack: { name, artists, image },
    // trackTrigger,
  } = usePlaylist();
  // const [fetchCurrentTrack] = useFetchCurrentTrackMutation();
  const { data, isSuccess } = useFetchCurrentTrackQuery();

  // fetch current track data on initial render (cuz trackTrigger is initially true) and when trackTrigger is true
  useEffect(() => {
    // const getCurrentTrack = async () => {
    //   // await dispatch(fetchCUrfrentTrakc());
    //   // try {
    //   //   const meow = await fetchCurrentTrack({ name });
    //   //   console.log(meow);
    //   // } catch {
    //   //   console.log('no clue');
    //   // }
    //   // try {
    //   //   const meow = await fetchCurrentTrack({}).unwrap();
    //   //   console.log(meow);
    //   // } catch (error) {
    //   //   console.log(error);
    //   // }

    // };
    // if (trackTrigger) {
    //   getCurrentTrack();
    // }
    // }, [dispatch, trackTrigger]);
    console.log(data);
  }, [data]);

  return (
    <CurrentTrackContainer aria-label='current_track_container'>
      {name && isSuccess && (
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
