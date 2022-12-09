import { useRef } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import usePlaylist from 'src/utils/usePlaylist';
import { VizMenuContainer } from 'src/common/styles/VisualizerMenuStyle';
import { whiteSpaceToUnderscore } from 'src/utils/Functions';
import { setTrackChange, setVizSong } from 'src/app/redux/visualizerSlice';
import VizMenuItem from './VizMenuItem';
import { useFetchSongMutation, useFetchVolumeMutation } from 'src/app/redux/services/api/musicPlayerApi';
import { setVolumeState } from 'src/app/redux/musicPlayerSlice';

type MenuItemTypes = {
  name: string;
  context_uri: string;
  track_number: number;
  id: string;
};

function VisualizerMenu() {
  const dispatch = useAppDispatch();
  const {
    playlistSongs: { tracks },
  } = usePlaylist();
  const divElmtRef = useRef<HTMLDivElement[]>([]);
  const vizList = ["dreamin'", 'i_could_be', 'Paradise', 'Computers_Take_Over_The_World']; // songs from public folder
  const [fetchSong] = useFetchSongMutation();
  const [fetchVolume] = useFetchVolumeMutation();

  // change to user selected song if it exists in vizList array
  const createClickHandler = async (name: string, uri: string, trackNum: number) => {
    const songObj = {
      uri,
      trackNum,
    };
    const newName = whiteSpaceToUnderscore(name);

    if (vizList.includes(newName)) {
      dispatch(setVizSong(newName));
      fetchSong(songObj);
      await fetchVolume('0'); // assure volume is off
      dispatch(setVolumeState(0));
      dispatch(setTrackChange(false)); // change state trigger
    }
  };

  const menuItemNames = tracks.map(({ name, context_uri, track_number, id }: MenuItemTypes, index: number) => (
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
