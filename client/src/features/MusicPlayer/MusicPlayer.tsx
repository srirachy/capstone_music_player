import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
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
import { useFetchUserQuery } from 'src/app/redux/services/api/userApi';
import { setUserInfo } from 'src/app/redux/userSlice';
import { useFetchLogoutMutation, useFetchRefreshTokenMutation } from 'src/app/redux/services/api/tokenApi';
import { setLogoutState, setRefreshTokenState } from 'src/app/redux/tokenSlice';

function MusicPlayer() {
  const dispatch = useAppDispatch();
  const { themeState } = useThemeState();
  const {
    tokenObj: { token, timeStamp, refreshToken, tokenExpires },
  } = useSessToken();
  const { data: userData, isSuccess: userIsSuccess } = useFetchUserQuery();
  const [fetchLogout] = useFetchLogoutMutation();
  const [freshy] = useFetchRefreshTokenMutation();

  // fetch/output user data
  useEffect(() => {
    if (userData && userIsSuccess) {
      dispatch(setUserInfo(userData));
    }
  }, [dispatch, userData, userIsSuccess]);

  // token persist
  useEffect(() => {
    // logout helper function
    const logout = async () => {
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
      const logoutInfo = await fetchLogout().unwrap(); // upwrap() basically turns response into readable data
      dispatch(setLogoutState(logoutInfo));
    };
    // refresh helper function
    const getFreshy = async () => {
      const newToken = await freshy(refreshToken).unwrap();
      dispatch(setRefreshTokenState(newToken));
    };

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
            getFreshy();
          } else {
            logout();
          }
        }
      }
    }
  }, [dispatch, fetchLogout, freshy, refreshToken, timeStamp, token, tokenExpires]);

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
