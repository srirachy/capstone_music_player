import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/redux/hooks';

function usePlaylist() {
  return useAppSelector(state => state.musicPlayer, shallowEqual);
}

export default usePlaylist;
