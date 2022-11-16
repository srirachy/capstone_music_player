import { MouseEvent } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import { fetchVolume } from 'src/app/redux/musicPlayerSlice';
import { VolumeContainer } from 'src/common/styles/VolumeStyle';

function Volume() {
  const dispatch = useAppDispatch();
  const setVolume = async (e: MouseEvent<HTMLInputElement>) => {
    const eTarget = e.target as HTMLInputElement;
    const curVol = eTarget.value;
    await dispatch(fetchVolume(curVol));
  };

  return (
    <VolumeContainer aria-label='volume_container'>
      <input type='range' min={0} max={100} onMouseUp={e => setVolume(e)} />
    </VolumeContainer>
  );
}

export default Volume;
