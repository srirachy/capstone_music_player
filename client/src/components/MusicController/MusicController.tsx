import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import { useAppDispatch } from 'src/store/hooks';
import {
  fetchNextOrPrevTrack,
  setTrackTrigger,
} from 'src/store/musicPlayerSlice';
import usePlaylist from 'src/utils/usePlaylist';
import {
  ControllerContainer,
  ShuffleWrapper,
  PrevWrapper,
  PlayPauseWrapper,
  NextWrapper,
  RepeatWrapper,
} from '../../styles/MusicControllerStyle';

function MusicController() {
  const { musicIsPlaying } = usePlaylist();
  const dispatch = useAppDispatch();

  const changeTrack = async (prevOrNext: string) => {
    await dispatch(fetchNextOrPrevTrack(prevOrNext)) // trigger next/prev song
      .then((status) => {
        if (status.meta.requestStatus === 'fulfilled') {
          dispatch(setTrackTrigger(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ControllerContainer aria-label="controller_container">
      <ShuffleWrapper>
        <BsShuffle />
      </ShuffleWrapper>
      <PrevWrapper>
        <CgPlayTrackPrev onClick={() => changeTrack('previous')} />
      </PrevWrapper>
      <PlayPauseWrapper>
        {musicIsPlaying ? (
          <BsFillPauseCircleFill />
        ) : (
          <BsFillPlayCircleFill />
        )}
      </PlayPauseWrapper>
      <NextWrapper>
        <CgPlayTrackNext onClick={() => changeTrack('next')} />
      </NextWrapper>
      <RepeatWrapper>
        <FiRepeat />
      </RepeatWrapper>
    </ControllerContainer>
  );
}

export default MusicController;
