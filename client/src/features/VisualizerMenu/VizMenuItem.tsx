import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { MenuItem } from 'src/common/styles/VizMenuItemStyle';
import { VizMenuProps } from 'src/common/models';

function VizMenuItem({ id, songName, createClickHandler, index }: VizMenuProps, ref: ForwardedRef<HTMLDivElement>) {
  const clickHandler = createClickHandler;
  const bkgdGreen = '#1ab26b';
  const darkBlueGreen = '#1c4347';
  const kindaBlueGreen = '#205249';
  const darkGreen = '#1a3b2c';
  const aShadeLighterGreen = '#20522d';
  const defaultGreen = '#1d471c';
  const [curBkgdColor, setBkgdColor] = useState<string>(bkgdGreen);

  // set color based on index mod 5
  useEffect(() => {
    if (index) {
      switch (index % 5) {
        case 1:
          setBkgdColor(darkBlueGreen);
          break;
        case 2:
          setBkgdColor(kindaBlueGreen);
          break;
        case 3:
          setBkgdColor(darkGreen);
          break;
        case 4:
          setBkgdColor(aShadeLighterGreen);
          break;
        default:
          setBkgdColor(defaultGreen);
      }
    }
  }, [index]);

  return (
    <MenuItem id={id} onClick={clickHandler} ref={ref} bkgdColor={curBkgdColor}>
      {songName}
    </MenuItem>
  );
}

export default forwardRef(VizMenuItem);
