// import { ChangeEvent, MouseEventHandler, useState } from 'react';
// import { useRef } from 'react';
import usePlaylist from 'src/utils/usePlaylist';
import VizMenuItem from './VizMenuItem';

function VisualizerMenu() {
  const {
    playlistSongs: { tracks },
  } = usePlaylist();
  // const [activeItem, setActiveItem] = useState<string>('');
  // const [activeItemPos, setActiveItemPos] = useState<
  //   number | undefined
  // >(0);
  // const [activeItemColor, setActiveItemColor] = useState<string>('');

  const createClickHandler = (name: string) => {
    console.log(name);
    console.log(document.getElementById(name)?.offsetTop);
    console.log(
      window
        .getComputedStyle(document.getElementById(name)!)
        .getPropertyValue('background-color'),
    );
  };

  const menuItemNames = tracks.map((item) => (
    <VizMenuItem
      createClickHandler={() => createClickHandler(item.name)}
      id={item.name}
      songName={item.name}
      key={item.name}
    />
  ));
  return <div>{menuItemNames}</div>;
}

export default VisualizerMenu;
