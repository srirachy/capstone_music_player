import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { MenuItem } from 'src/styles/VizMenuItemStyle';
import { VizMenuProps } from 'src/types';

function VizMenuItem(
  { id, songName, createClickHandler, index }: VizMenuProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const clickHandler = createClickHandler;
  const [curBkgdColor, setBkgdColor] = useState<string>('#1ab26b');

  useEffect(() => {
    if (index) {
      switch (index % 5) {
        case 1:
          setBkgdColor('#1c4347');
          break;
        case 2:
          setBkgdColor('#205249');
          break;
        case 3:
          setBkgdColor('#1a3b2c');
          break;
        case 4:
          setBkgdColor('#20522d');
          break;
        default:
          setBkgdColor('#1d471c');
      }
    }
  }, [index]);

  return (
    <MenuItem
      id={id}
      onClick={clickHandler}
      ref={ref}
      bkgdColor={curBkgdColor}
    >
      {songName}
    </MenuItem>
  );
}

export default forwardRef(VizMenuItem);
