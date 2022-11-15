import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/redux/hooks';

function useVizSong() {
  return useAppSelector(state => state.visualizer, shallowEqual);
}

export default useVizSong;
