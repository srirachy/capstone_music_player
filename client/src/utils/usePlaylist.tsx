import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';

function usePlaylist() {
  return useAppSelector((state) => state.musicPlayer, shallowEqual);
}

export default usePlaylist;
