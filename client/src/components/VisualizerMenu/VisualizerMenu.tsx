// import { ChangeEvent, MouseEventHandler, useState } from 'react';
// import { useRef } from 'react';
import { useRef } from 'react';
import usePlaylist from 'src/utils/usePlaylist';
import VizMenuItem from './VizMenuItem';

function VisualizerMenu() {
  const {
    playlistSongs: { tracks },
  } = usePlaylist();
  const meowRef = useRef<HTMLDivElement[]>([]);
  // const [activeItem, setActiveItem] = useState<string>('');
  // const [activeItemPos, setActiveItemPos] = useState<
  //   number | undefined
  // >(0);
  // const [activeItemColor, setActiveItemColor] = useState<string>('');

  const createClickHandler = (name: string, index: number) => {
    console.log(name);
    // console.log(
    //   window
    //     .getComputedStyle(document.getElementById(name)!)
    //     .getPropertyValue('background-color'),
    // );
    if (meowRef.current[index]) {
      console.log(meowRef.current[index].offsetTop);
      console.log(meowRef.current[index].style.backgroundColor);
    }
  };

  const menuItemNames = tracks.map((item, index) => (
    <VizMenuItem
      createClickHandler={() => createClickHandler(item.name, index)}
      id={item.name}
      songName={item.name}
      key={item.name}
      ref={(el: any) => {
        meowRef.current[index] = el;
      }}
      index={index}
    />
  ));
  return <div>{menuItemNames}</div>;
}

export default VisualizerMenu;
