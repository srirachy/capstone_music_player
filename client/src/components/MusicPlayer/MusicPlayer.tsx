// this component will house the three themes: clone, my own style - emphasis on music discovery, and visualizer... maybe not visualizer anymore :(
import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { fetchUser, setUserInfo } from 'src/store/userSlice';
import useSessToken from 'src/utils/useSessToken';
import {
  fetchRefreshToken,
  setSessToken,
  setTimeStamp,
  setTokenExpires,
} from 'src/store/tokenSlice';
import Footer from '../Footer/Footer';
import SpotifyTheme from '../SpotifyTheme/SpotifyTheme';
import {
  MusicPlayerContainer,
  ThemeWrapper,
  FooterWrapper,
} from '../../styles/MusicPlayerStyle';

function MusicPlayer() {
  const dispatch = useAppDispatch();
  const { sessToken, timeStamp, refreshToken, tokenExpires } =
    useSessToken();

  // fetch/output user data
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await dispatch(fetchUser());
      const data = await response.payload;
      if (data) {
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        };
        dispatch(setUserInfo(userInfo));
      }
    };
    getUserInfo();
  }, [dispatch]);

  // token persist
  useEffect(() => {
    if (sessToken) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const hasError = urlParams.get('error');
      const persistToken = localStorage.getItem('persist:token');
      if (persistToken) {
        const persistParse = JSON.parse(persistToken);

        if (
          hasError ||
          hasTokenExpired() ||
          persistParse.sessToken === 'undefined'
        ) {
          getRefreshToken();
        }
      }
    }

    // helper function to check if token expired
    function hasTokenExpired() {
      if (!sessToken || !timeStamp) {
        return false;
      }

      const millisecondsElpased = Date.now() - Number(timeStamp);
      return millisecondsElpased / 1000 > Number(tokenExpires);
    }

    // logout helper function
    function logout() {
      window.localStorage.removeItem('persist:token');
      window.location.assign('/'); // not sure if this works, but trying to jus redirect to origin which should be the login page once localStorage clears
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
      const response = await dispatch(
        fetchRefreshToken(refreshToken),
      );
      dispatch(setSessToken(response.payload.access_token));
      dispatch(setTokenExpires(response.payload.expires_in));
      dispatch(setTimeStamp(Date.now()));
    }
  }, [dispatch, refreshToken, sessToken, timeStamp, tokenExpires]);

  return (
    <MusicPlayerContainer>
      <ThemeWrapper>
        {/* toggle -- spotify/discover/visualizer theme */}
        <SpotifyTheme />
      </ThemeWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MusicPlayerContainer>
  );
}

export default MusicPlayer;
