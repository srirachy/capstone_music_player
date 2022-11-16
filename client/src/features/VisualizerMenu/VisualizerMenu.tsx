import { useRef } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import { fetchCurrentTrack, fetchSong, fetchVolume } from 'src/app/redux/musicPlayerSlice';
import usePlaylist from 'src/utils/usePlaylist';
import { VizMenuContainer } from 'src/common/styles/VisualizerMenuStyle';
import { whiteSpaceToUnderscore } from 'src/utils/Functions';
import { setTrackChange, setVizSong } from 'src/app/redux/visualizerSlice';
import VizMenuItem from './VizMenuItem';

function VisualizerMenu() {
  const dispatch = useAppDispatch();
  const {
    playlistSongs: { tracks },
  } = usePlaylist();
  const divElmtRef = useRef<HTMLDivElement[]>([]);
  const vizList = ["dreamin'", 'i_could_be', 'Paradise', 'Computers_Take_Over_The_World']; // songs from public folder

  // change to user selected song if it exists in vizList array
  const createClickHandler = async (name: string, uri: string, trackNum: number) => {
    const songObj = {
      uri,
      trackNum,
    };
    const newName = whiteSpaceToUnderscore(name);

    if (vizList.includes(newName)) {
      dispatch(setVizSong(newName));
      await dispatch(fetchSong(songObj));
      await dispatch(fetchCurrentTrack());
      await dispatch(fetchVolume('0'));
      dispatch(setTrackChange(false));
    }
  };

  const menuItemNames = tracks.map(({ name, context_uri, track_number, id }, index) => (
    <VizMenuItem
      createClickHandler={() => createClickHandler(name, context_uri, track_number)}
      id={id}
      key={id}
      index={index}
      songName={name}
      ref={(elmnt: HTMLDivElement) => {
        divElmtRef.current[index] = elmnt;
      }}
    />
  ));
  return <VizMenuContainer>{menuItemNames}</VizMenuContainer>;
}

export default VisualizerMenu;
