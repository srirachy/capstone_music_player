import { useEffect } from 'react';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Login from './components/Login/Login';
import { AppContainer } from './styles/AppStyle';
import { useAppDispatch } from './store/hooks';
import useSessToken from './utils/useSessToken';
import { fetchToken } from './store/tokenSlice';

function App() {
  const dispatch = useAppDispatch();
  const {
    tokenObj: { token },
  } = useSessToken();

  useEffect(() => {
    const getToken = async () => {
      console.log('getting initial token');
      await dispatch(fetchToken());
    };
    if (!token) {
      getToken();
    }
  }, [dispatch, token]);

  return (
    <AppContainer>
      <div>{!token ? <Login /> : <MusicPlayer />}</div>
    </AppContainer>
  );
}

export default App;
