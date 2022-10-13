import { MenuItem } from 'src/styles/VizMenuItemStyle';

function VizMenuItem({ createClickHandler, id, songName, ref }: any) {
  const clickHandler = createClickHandler;
  return (
    <MenuItem id={id} onClick={clickHandler} ref={ref}>
      {songName}
    </MenuItem>
  );
}

export default VizMenuItem;
