// this component will house the three themes: clone, my own style - emphasis on music discovery, and visualizer... maybe not visualizer anymore :(
import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { fetchUser } from 'src/store/userSlice';
import { fetchLogout, fetchRefreshToken } from 'src/store/tokenSlice';
import { persistor } from 'src/store';
import useSessToken from 'src/utils/useSessToken';
import useThemeState from 'src/utils/useThemeState';
import Footer from '../Footer/Footer';
import SpotifyTheme from '../SpotifyTheme/SpotifyTheme';
import DiscoverTheme from '../DiscoverTheme/DiscoverTheme';
import VisualizerTheme from '../VisualizerTheme/VisualizerTheme';
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
  const { themeState } = useThemeState();
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
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
      dispatch(fetchLogout());
    }
  }, [dispatch, refreshToken, timeStamp, token, tokenExpires]);

  return (
    <MusicPlayerContainer>
      <ThemeWrapper>
        {/* toggle -- spotify/discover/visualizer theme */}
        {themeState === 'Spotify' && <SpotifyTheme />}
        {themeState === 'Discover' && <DiscoverTheme />}
        {themeState === 'Visual' && <VisualizerTheme />}
      </ThemeWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MusicPlayerContainer>
  );
}

export default MusicPlayer;
