import { useEffect, useState } from 'react';
import useThemeState from 'src/utils/useThemeState';
import {
  FooterContainer,
  VolumeWrapper,
  SwitchWrapper,
  SwitchContainer,
} from '../../styles/FooterStyle';
import CurrentTrack from '../CurrentTrack/CurrentTrack';
import MusicController from '../MusicController/MusicController';
import Volume from '../Volume/Volume';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Footer() {
  const { themeState } = useThemeState();
  const [val, setVals] = useState<string[]>([]);

  useEffect(() => {
    setVals(['Spotify', 'Discover', 'Visual']);
  }, []);

  return (
    <FooterContainer aria-label="footer_container">
      <CurrentTrack />
      <MusicController />
      <SwitchContainer>
        <VolumeWrapper>
          <Volume />
        </VolumeWrapper>
        <SwitchWrapper>
          <ToggleSwitch vals={val} curSelect={themeState} />
        </SwitchWrapper>
      </SwitchContainer>
    </FooterContainer>
  );
}

export default Footer;
