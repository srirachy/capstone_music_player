import { useEffect } from 'react';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Login from './components/Login/Login';
import { AppContainer } from './styles/AppStyle';
import { useAppDispatch } from './store/hooks';
import {
  setRefreshToken,
  setSessToken,
  setTimeStamp,
  setTokenExpires,
} from './store/tokenSlice';
import useSessToken from './utils/useSessToken';

function App() {
  const dispatch = useAppDispatch();
  const { sessToken } = useSessToken();

  useEffect(() => {
    const getToken = async () => {
      console.log('getting initial token');
      const response = await fetch('/auth/token');
      const data = await response.json();
      dispatch(setSessToken(data.access_token));
      dispatch(setTokenExpires(data.expires_in));
      dispatch(setRefreshToken(data.refresh_token));
      dispatch(setTimeStamp(Date.now()));
    };
    if (!sessToken) {
      getToken();
    }
  }, [dispatch, sessToken]);

  return (
    <AppContainer>
      <div>{!sessToken ? <Login /> : <MusicPlayer />}</div>
    </AppContainer>
  );
}

export default App;
