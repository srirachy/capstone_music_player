// this component will house the three themes: clone, my own style - emphasis on music discovery, and visualizer
import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { setUserInfo } from 'src/store/userSlice';
import Footer from '../Footer/Footer';
import SpotifyTheme from '../SpotifyTheme/SpotifyTheme';
import {
  MusicPlayerContainer,
  ThemeWrapper,
  FooterWrapper,
} from '../../styles/MusicPlayerStyle';

function MusicPlayer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch('/auth/me');
      const resData = await response.json();
      const data = JSON.parse(resData);
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
