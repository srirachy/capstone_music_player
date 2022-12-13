import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import { useAppDispatch } from 'src/app/redux/hooks';
import { setShuffleState, setRepeatState } from 'src/app/redux/musicPlayerSlice';
import {
  useFetchNextOrPrevTrackMutation,
  useFetchPauseOrPlayMutation,
  useFetchRepeatMutation,
  useFetchShuffleMutation,
} from 'src/app/redux/services/api/musicPlayerApi';
import usePlaylist from 'src/utils/usePlaylist';
import {
  ControllerContainer,
  ShuffleWrapper,
  PrevWrapper,
  PlayPauseWrapper,
  NextWrapper,
  RepeatWrapper,
} from '../../common/styles/MusicControllerStyle';

function MusicController() {
  const { musicIsPlaying, shuffleState, repeatState } = usePlaylist();
  const dispatch = useAppDispatch();
  const [prevOrNextTrack] = useFetchNextOrPrevTrackMutation();
  const [pauseOrPlayTrack] = useFetchPauseOrPlayMutation();
  const [setShuffle] = useFetchShuffleMutation();
  const [setRepeat] = useFetchRepeatMutation();

  // onClick to change track w/ prev/next buttons
  const changeTrack = async (prevOrNext: string) => {
    await prevOrNextTrack(prevOrNext);
  };

  // onClick to pause or play track
  const mpState = async (pauseOrPlay: string) => {
    await pauseOrPlayTrack(pauseOrPlay);
  };

  // oncClick to toggle on/off shuffle
  const toggleShuffle = async () => {
    const curShuffle = shuffleState ? 'false' : 'true';
    await setShuffle(curShuffle);
    dispatch(setShuffleState(curShuffle));
  };

  // onClick repeat
  const toggleRepeat = async () => {
    let curRepeat;
    if (repeatState === '' || repeatState === 'off') {
      curRepeat = 'context';
    } else if (repeatState === 'context') {
      curRepeat = 'track';
    } else {
      curRepeat = 'off';
    }
    await setRepeat(curRepeat);
    dispatch(setRepeatState(curRepeat));
  };

  return (
    <ControllerContainer aria-label='controller_container'>
      <ShuffleWrapper>
        <BsShuffle onClick={() => toggleShuffle()} />
      </ShuffleWrapper>
      <PrevWrapper>
        <CgPlayTrackPrev onClick={() => changeTrack('previous')} />
      </PrevWrapper>
      <PlayPauseWrapper>
        {musicIsPlaying ? (
          <BsFillPauseCircleFill onClick={() => mpState('pause')} />
        ) : (
          <BsFillPlayCircleFill onClick={() => mpState('play')} />
        )}
      </PlayPauseWrapper>
      <NextWrapper>
        <CgPlayTrackNext onClick={() => changeTrack('next')} />
      </NextWrapper>
      <RepeatWrapper>
        <FiRepeat onClick={() => toggleRepeat()} />
      </RepeatWrapper>
    </ControllerContainer>
  );
}

export default MusicController;
