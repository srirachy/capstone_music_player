// this component will house the three themes: clone, my own style - emphasis on music discovery, and visualizer... maybe not visualizer anymore :(
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { fetchUser } from 'src/store/userSlice';
import useSessToken from 'src/utils/useSessToken';
import { fetchLogout, fetchRefreshToken } from 'src/store/tokenSlice';
import { persistor } from 'src/store';
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
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function MusicPlayer() {
  const dispatch = useAppDispatch();
  const {
    tokenObj: { token, timeStamp, refreshToken, tokenExpires },
  } = useSessToken();
  const [val, setVals] = useState<string[]>([]);

  // fetch/output user data
  useEffect(() => {
    const getUserInfo = async () => {
      await dispatch(fetchUser());
    };
    getUserInfo();
  }, [dispatch]);

  useEffect(() => {
    setVals(['meow', 'poopo', 'lala']);
  }, []);

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
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
      dispatch(fetchLogout());
    }
  }, [dispatch, refreshToken, timeStamp, token, tokenExpires]);

  // function logoutTest() {
  //   persistor.pause();
  //   persistor.flush().then(() => {
  //     return persistor.purge();
  //   });
  //   console.log(localStorage.getItem('persist:token'));
  //   dispatch(fetchLogout());
  // }

  return (
    <MusicPlayerContainer>
      <ThemeWrapper>
        {/* toggle -- spotify/discover/visualizer theme */}
        <SpotifyTheme />
      </ThemeWrapper>
      <FooterWrapper>
        {/* <button type="button" onClick={() => logoutTest()}>
          logout test
        </button> */}
        <ToggleSwitch vals={val} curSelect="lala" />
        <Footer />
      </FooterWrapper>
    </MusicPlayerContainer>
  );
}

export default MusicPlayer;
