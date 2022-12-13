import { MouseEvent } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import { setVolumeState } from 'src/app/redux/musicPlayerSlice';
import { useFetchVolumeMutation } from 'src/app/redux/services/api/musicPlayerApi';
import { VolumeContainer } from 'src/common/styles/VolumeStyle';

function Volume() {
  const dispatch = useAppDispatch();
  const [setCurVol] = useFetchVolumeMutation();
  const setVolume = async (e: MouseEvent<HTMLInputElement>) => {
    const eTarget = e.target as HTMLInputElement;
    const curVol = eTarget.value;
    await setCurVol(curVol);
    dispatch(setVolumeState(+curVol)); // send as number type
  };

  return (
    <VolumeContainer aria-label='volume_container'>
      <input type='range' min={0} max={100} onMouseUp={e => setVolume(e)} />
    </VolumeContainer>
  );
}

export default Volume;
