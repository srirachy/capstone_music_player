import { useRef } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import {
  fetchCurrentTrack,
  fetchSong,
  fetchVolume,
} from 'src/store/musicPlayerSlice';
import usePlaylist from 'src/utils/usePlaylist';
import { VizMenuContainer } from 'src/styles/VisualizerMenuStyle';
import { whiteSpaceToUnderscore } from 'src/utils/Functions';
import { setVizSong } from 'src/store/visualizerSlice';
import VizMenuItem from './VizMenuItem';

function VisualizerMenu() {
  const dispatch = useAppDispatch();
  const {
    playlistSongs: { tracks },
  } = usePlaylist();
  const meowRef = useRef<HTMLDivElement[]>([]);
  const vizList = [
    "dreamin'",
    'i_could_be',
    'Paradise',
    'Computers_Take_Over_The_World',
  ]; // songs from public folder

  const createClickHandler = async (
    name: string,
    uri: string,
    trackNum: number,
  ) => {
    console.log(name);
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
    }
  };

  const menuItemNames = tracks.map((item, index) => (
    <VizMenuItem
      createClickHandler={() =>
        createClickHandler(
          item.name,
          item.context_uri,
          item.track_number,
        )
      }
      id={item.id}
      key={item.id}
      index={index}
      songName={item.name}
      ref={(elmnt: HTMLDivElement) => {
        meowRef.current[index] = elmnt;
      }}
    />
  ));
  return <VizMenuContainer>{menuItemNames}</VizMenuContainer>;
}

export default VisualizerMenu;
