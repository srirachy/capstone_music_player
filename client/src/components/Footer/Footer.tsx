import { useEffect, useState } from 'react';
// import { persistor } from 'src/store'; // placeholder imports
// import { useAppDispatch } from 'src/store/hooks';
// import { fetchLogout } from 'src/store/tokenSlice';
import useThemeState from 'src/utils/useThemeState';
import {
  FooterContainer,
  SwitchWrapper,
} from '../../styles/FooterStyle';
import CurrentTrack from '../CurrentTrack/CurrentTrack';
import MusicController from '../MusicController/MusicController';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Footer() {
  // const dispatch = useAppDispatch();
  const { themeState } = useThemeState();
  const [val, setVals] = useState<string[]>([]);

  useEffect(() => {
    setVals(['Spotify', 'Discover', 'Visual']);
  }, []);

  // temp function for testing
  // function logoutTest() {
  //   persistor.pause();
  //   persistor.flush().then(() => {
  //     return persistor.purge();
  //   });
  //   console.log(localStorage.getItem('persist:token'));
  //   dispatch(fetchLogout());
  // }
  return (
    <FooterContainer aria-label="footer_container">
      <CurrentTrack />
      <MusicController />
      {/* temp logout button for testing purposes */}
      {/* <button type="button" onClick={() => logoutTest()}>
        logout test
      </button> */}
      <SwitchWrapper>
        <ToggleSwitch vals={val} curSelect={themeState} />
      </SwitchWrapper>
    </FooterContainer>
  );
}

export default Footer;
