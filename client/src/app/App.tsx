import { useEffect } from 'react';
import MusicPlayer from '../features/MusicPlayer/MusicPlayer';
import Login from '../features/Login/Login';
import { AppContainer } from '../common/styles/AppStyle';
import { useAppDispatch } from './redux/hooks';
import useSessToken from '../utils/useSessToken';
import { fetchRefreshToken, fetchToken } from './redux/tokenSlice';
import useUserInfo from '../utils/useUserInfo';

function App() {
  const dispatch = useAppDispatch();
  const {
    musicOrLogin,
    tokenObj: { token, refreshToken },
  } = useSessToken();
  const {
    userInfo: { userId },
  } = useUserInfo();

  // fetchToken upon login
  useEffect(() => {
    const getToken = async () => {
      await dispatch(fetchToken());
    };
    if (!token) {
      getToken();
    }
  }, [dispatch, token]);

  // fetchRefreshToken if one exists and user data is empty -- mostly to inject persisted token to server-side if its empty
  useEffect(() => {
    const getFreshy = async () => {
      await dispatch(fetchRefreshToken(refreshToken));
    };
    if (!userId && refreshToken) {
      getFreshy();
    }
  }, [dispatch, refreshToken, userId]);

  return (
    <AppContainer>
      <div>{musicOrLogin ? <MusicPlayer /> : <Login />}</div>
    </AppContainer>
  );
}

export default App;
