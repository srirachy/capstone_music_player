import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import { fetchUser } from 'src/app/redux/userSlice';
import { fetchLogout, fetchRefreshToken } from 'src/app/redux/tokenSlice';
import { persistor } from 'src/app/redux';
import useSessToken from 'src/utils/useSessToken';
import useThemeState from 'src/utils/useThemeState';
import { setVizSong } from 'src/app/redux/visualizerSlice';
import Footer from 'src/common/components/Footer/Footer';
import SpotifyTheme from '../SpotifyTheme/SpotifyTheme';
import DiscoverTheme from '../DiscoverTheme/DiscoverTheme';
import VisualizerTheme from '../VisualizerTheme/VisualizerTheme';
import { MusicPlayerContainer, ThemeWrapper, FooterWrapper } from 'src/common/styles/MusicPlayerStyle';
import { getRefreshToken, hasTokenExpired } from 'src/utils/Functions';

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
    // logout helper function
    function logout() {
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
      dispatch(fetchLogout());
    }

    if (token) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const hasError = urlParams.get('error');
      const persistToken = localStorage.getItem('persist:token');
      if (persistToken) {
        const persistParse = JSON.parse(persistToken);
        const tokenObjParse = JSON.parse(persistParse.tokenObj);
        if (hasError || hasTokenExpired(token, timeStamp, tokenExpires) || tokenObjParse.token === 'undefined') {
          const canRefresh = getRefreshToken();
          if (canRefresh) {
            dispatch(fetchRefreshToken(refreshToken)); // use refreshToken to getRefreshToken()
          } else {
            logout();
          }
        }
      }
    }
  }, [dispatch, refreshToken, timeStamp, token, tokenExpires]);

  // clean up vizSong when switching out of visual theme
  useEffect(() => {
    if (themeState !== 'Visual') {
      dispatch(setVizSong(''));
    }
  });

  return (
    <MusicPlayerContainer>
      <ThemeWrapper>
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
