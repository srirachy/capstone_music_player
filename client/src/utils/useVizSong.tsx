import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';

function useVizSong() {
  return useAppSelector((state) => state.visualizer, shallowEqual);
}

export default useVizSong;
