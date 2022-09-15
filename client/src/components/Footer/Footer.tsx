import { FooterContainer } from '../../styles/FooterStyle';
import CurrentTrack from '../CurrentTrack/CurrentTrack';
import MusicController from '../MusicController/MusicController';

function Footer() {
  return (
    <FooterContainer aria-label="footer_container">
      <CurrentTrack />
      <MusicController />
    </FooterContainer>
  );
}

export default Footer;
