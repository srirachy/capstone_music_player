// this component will house the three themes: clone, my own style - emphasis on music discovery, and visualizer... maybe not visualizer anymore :(
import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { fetchUser } from 'src/store/userSlice';
import useSessToken from 'src/utils/useSessToken';
import { clearToken, fetchRefreshToken } from 'src/store/tokenSlice';
import storage from 'redux-persist/lib/storage';
import Footer from '../Footer/Footer';
import SpotifyTheme from '../SpotifyTheme/SpotifyTheme';
import {
  MusicPlayerContainer,
  ThemeWrapper,
  FooterWrapper,
} from '../../styles/MusicPlayerStyle';
import {
  getRefreshToken,
  hasTokenExpired,
} from '../../utils/Functions';

function MusicPlayer() {
  const dispatch = useAppDispatch();
  const {
    tokenObj: { token, timeStamp, refreshToken, tokenExpires },
  } = useSessToken();

  // fetch/output user data
  useEffect(() => {
    const getUserInfo = async () => {
      await dispatch(fetchUser());
    };
    getUserInfo();
  }, [dispatch]);

  // token persist
  useEffect(() => {
    // use refreshToken to getRefreshToken()
    if (token) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const hasError = urlParams.get('error');
      const persistToken = localStorage.getItem('persist:token');
      if (persistToken) {
        const persistParse = JSON.parse(persistToken);
        const tokenObjParse = JSON.parse(persistParse.tokenObj);
        if (
          hasError ||
          hasTokenExpired(token, timeStamp, tokenExpires) ||
          tokenObjParse.token === 'undefined'
        ) {
          const canRefresh = getRefreshToken();
          if (canRefresh) {
            dispatch(fetchRefreshToken(refreshToken));
          } else {
            console.log('no refresh token avail');
            logout();
          }
        }
      }
    }

    // logout helper function
    function logout() {
      dispatch(clearToken({}));
      // window.location.assign('/'); // not sure if this works, but trying to jus redirect to origin which should be the login page once localStorage clears
    }
  }, [dispatch, refreshToken, timeStamp, token, tokenExpires]);

  async function logoutTest() {
    console.log(localStorage.getItem('persist:token'));
    storage.removeItem('persist:token');
    console.log(storage.getItem('persist:token'));
    dispatch(clearToken({})); // looks like redux-persist is working a bit too well... i try to clear state and local storage, but the tokenState manages to refill itself and log back in
    // window.location.assign('/');
  }

  return (
    <MusicPlayerContainer>
      <ThemeWrapper>
        {/* toggle -- spotify/discover/visualizer theme */}
        <SpotifyTheme />
      </ThemeWrapper>
      <FooterWrapper>
        <button type="button" onClick={() => logoutTest()}>
          logout test
        </button>
        <Footer />
      </FooterWrapper>
    </MusicPlayerContainer>
  );
}

export default MusicPlayer;
