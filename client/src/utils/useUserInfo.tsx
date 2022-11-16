import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';

function useUserInfo() {
  return useAppSelector((state) => state.user, shallowEqual);
}

export default useUserInfo;
