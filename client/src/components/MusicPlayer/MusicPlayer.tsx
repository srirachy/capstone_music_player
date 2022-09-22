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
          hasTokenExpired() ||
          tokenObjParse.token === 'undefined'
        ) {
          getRefreshToken();
        }
      }
    }

    // helper function to check if token expired
    function hasTokenExpired() {
      if (!token || !timeStamp) {
        return false;
      }

      const millisecondsElapsed = Date.now() - Number(timeStamp);
      return millisecondsElapsed / 1000 > Number(tokenExpires);
    }

    // logout helper function
    function logout() {
      dispatch(clearToken({}));
      // window.location.assign('/'); // not sure if this works, but trying to jus redirect to origin which should be the login page once localStorage clears
    }

    // getRefreshToken helper function -- logout if no refreshToken, otherwise fetch refreshToken
    async function getRefreshToken() {
      const persistToken = localStorage.getItem('persist:token');
      if (persistToken) {
        const persistParse = JSON.parse(persistToken);
        if (
          !persistParse.refreshToken ||
          persistParse.refreshToken === 'undefined' ||
          Date.now() - Number(persistParse.tokenExpires) / 1000 < 1000
        ) {
          console.log('no refresh token avail');
          logout(); // log out if unable to find refresh token
        }
      }

      // update session token if there is a refresh token
      await dispatch(fetchRefreshToken(refreshToken));
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
