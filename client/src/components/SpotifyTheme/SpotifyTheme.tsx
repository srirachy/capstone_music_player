import {
  SpotifyThemeContainer,
  SidebarWrapper,
  NavBarWrapper,
  ContentWrapper,
} from '../../styles/SpotifyThemeStyle';
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../NavBar/NavBar';
import SpotifyContent from '../SpotifyContent/SpotifyContent';

function SpotifyTheme() {
  return (
    <SpotifyThemeContainer>
      <SidebarWrapper>
        <Sidebar />
        <NavBarWrapper>
          <NavBar />
          <ContentWrapper>
            <SpotifyContent />
          </ContentWrapper>
        </NavBarWrapper>
      </SidebarWrapper>
    </SpotifyThemeContainer>
  );
}

export default SpotifyTheme;
