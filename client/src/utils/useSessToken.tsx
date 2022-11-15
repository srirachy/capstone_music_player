import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/redux/hooks';

function useSessToken() {
  return useAppSelector(state => state.token, shallowEqual);
}

export default useSessToken;
