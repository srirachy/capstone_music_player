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
  fetchPauseOrPlay,
  fetchRepeat,
  fetchShuffle,
  setMusicIsPlaying,
  setRepeatState,
  setShuffleState,
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
  const { musicIsPlaying, shuffleState, repeatState } = usePlaylist();
  const dispatch = useAppDispatch();

  // onClick to change track w/ prev/next buttons
  const changeTrack = async (prevOrNext: string) => {
    await dispatch(fetchNextOrPrevTrack(prevOrNext)) // trigger next/prev song
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // onClick to pause or play track
  const mpState = async (pauseOrPlay: string) => {
    await dispatch(fetchPauseOrPlay(pauseOrPlay))
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setMusicIsPlaying(pauseOrPlay === 'play'));
  };

  // onClick shuffle
  const toggleShuffle = async () => {
    const curShuffle = shuffleState ? 'false' : 'true';
    // pass state as string for fetch
    await dispatch(fetchShuffle(curShuffle))
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setShuffleState(!shuffleState)); // swap state
  };

  // onClick repeat
  const toggleRepeat = async () => {
    let curRepeat;
    if (repeatState === '' || repeatState === 'off') {
      curRepeat = 'track';
    } else if (repeatState === 'track') {
      curRepeat = 'context';
    } else {
      curRepeat = 'off';
    }
    await dispatch(fetchRepeat(curRepeat))
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setRepeatState(curRepeat));
  };

  return (
    <ControllerContainer aria-label="controller_container">
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
