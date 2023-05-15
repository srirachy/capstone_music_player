import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/redux/hooks';

function useThemeState() {
  return useAppSelector(state => state.theme, shallowEqual);
}

export default useThemeState;
