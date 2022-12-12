import { useEffect } from 'react';
import MusicPlayer from '../features/MusicPlayer/MusicPlayer';
import Login from '../features/Login/Login';
import { AppContainer } from '../common/styles/AppStyle';
import { useAppDispatch } from './redux/hooks';
import useSessToken from '../utils/useSessToken';
// import { fetchRefreshToken, fetchToken } from './redux/tokenSlice';
import useUserInfo from '../utils/useUserInfo';
import { useFetchRefreshTokenMutation, useFetchTokenQuery } from './redux/services/api/tokenApi';
import { setRefreshTokenState, setTokenState } from './redux/tokenSlice';

function App() {
  const dispatch = useAppDispatch();
  const {
    musicOrLogin,
    tokenObj: { token, refreshToken },
  } = useSessToken();
  const {
    userInfo: { userId },
  } = useUserInfo();
  const { data: tokenData, isSuccess: tokenIsSuccess } = useFetchTokenQuery();
  const [freshy] = useFetchRefreshTokenMutation();

  // fetchToken upon login
  useEffect(() => {
    const getToken = () => {
      if (tokenData && tokenIsSuccess) {
        dispatch(setTokenState(tokenData));
      }
    };
    if (!token) {
      getToken();
    }
  }, [dispatch, token, tokenData, tokenIsSuccess]);

  // fetchRefreshToken if one exists and user data is empty -- mostly to inject persisted token to server-side if its empty
  useEffect(() => {
    const getFreshy = async () => {
      const newToken = await freshy(refreshToken).unwrap();
      dispatch(setRefreshTokenState(newToken));
    };
    if (!userId && refreshToken) {
      getFreshy();
    }
  }, [dispatch, freshy, refreshToken, userId]);

  return (
    <AppContainer>
      <div>{musicOrLogin ? <MusicPlayer /> : <Login />}</div>
    </AppContainer>
  );
}

export default App;
