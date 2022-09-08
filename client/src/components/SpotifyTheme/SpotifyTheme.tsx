import {
  SpotifyThemeContainer,
  SidebarWrapper,
  SearchWrapper,
  ContentWrapper,
} from '../../styles/SpotifyThemeStyle';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import SpotifyContent from '../SpotifyContent/SpotifyContent';

function SpotifyTheme() {
  return (
    <SpotifyThemeContainer>
      <SidebarWrapper>
        <Sidebar />
        <SearchWrapper>
          <Search />
          <ContentWrapper>
            <SpotifyContent />
          </ContentWrapper>
        </SearchWrapper>
      </SidebarWrapper>
    </SpotifyThemeContainer>
  );
}

export default SpotifyTheme;
