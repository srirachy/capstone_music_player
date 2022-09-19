import { useEffect } from 'react';
// import WebPlayback from './components/WebPlayback/WebPlayback';
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
  const { sessToken, tokenExpires, refreshToken, timeStamp } =
    useSessToken();

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch('/auth/token');
      const data = await response.json();
      dispatch(setSessToken(data.access_token));
      dispatch(setTokenExpires(data.expires_in));
      dispatch(setRefreshToken(data.refresh_token));
      dispatch(setTimeStamp(Date.now()));
    };
    if (!sessToken) {
      getToken();
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const hasError = urlParams.get('error');

      if (
        hasError ||
        hasTokenExpired() ||
        localStorage.getItem('sessToken') === 'undefined'
      ) {
        getRefreshToken();
      }
    }

    function hasTokenExpired() {
      if (!sessToken || !timeStamp) {
        return false;
      }

      const millisecondsElpased = Date.now() - Number(timeStamp);
      return millisecondsElpased / 1000 > Number(tokenExpires);
    }

    function getRefreshToken() {}
  }, [dispatch, refreshToken, sessToken, timeStamp, tokenExpires]);

  return (
    <AppContainer>
      <div>{!sessToken ? <Login /> : <MusicPlayer />}</div>
      {/* <div>{!token.sessToken ? <Login /> : <WebPlayback />}</div> */}
    </AppContainer>
  );
}

export default App;
