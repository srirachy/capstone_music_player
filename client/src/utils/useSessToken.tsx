import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';

function useSessToken() {
  return useAppSelector((state) => state.token, shallowEqual);
}

export default useSessToken;
