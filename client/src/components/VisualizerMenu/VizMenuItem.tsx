import { forwardRef, useEffect, useState } from 'react';
import { MenuItem } from 'src/styles/VizMenuItemStyle';

function VizMenuItem(
  { id, songName, createClickHandler, index }: any,
  ref: any,
) {
  const clickHandler = createClickHandler;
  const [curBkgdColor, setBkgdColor] = useState<string>('#1ab26b');

  useEffect(() => {
    if (index) {
      switch (index % 5) {
        case 1:
          setBkgdColor('#70f9b9');
          break;
        case 2:
          setBkgdColor('#25f795');
          break;
        case 3:
          setBkgdColor('#367859');
          break;
        case 4:
          setBkgdColor('#1dc476');
          break;
        default:
          setBkgdColor('#1ab26b');
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
