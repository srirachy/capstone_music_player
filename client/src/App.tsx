import { useEffect } from 'react';
// import WebPlayback from './components/WebPlayback/WebPlayback';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Login from './components/Login/Login';
import { AppContainer } from './styles/AppStyle';
import { useAppDispatch } from './store/hooks';
import { setSessToken } from './store/tokenSlice';
import useSessToken from './utils/useSessToken';

function App() {
  const dispatch = useAppDispatch();
  const token = useSessToken();

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch('/auth/token');
      const data = await response.json();
      dispatch(setSessToken(data.access_token));
    };
    if (!token.sessToken) {
      getToken();
    }
  }, [dispatch, token]);
  return (
    <AppContainer>
      <div>{!token.sessToken ? <Login /> : <MusicPlayer />}</div>
    </AppContainer>
  );
}

export default App;
