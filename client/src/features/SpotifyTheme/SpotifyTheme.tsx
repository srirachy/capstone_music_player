import { useState, useRef } from 'react';
import {
  SpotifyThemeContainer,
  SidebarWrapper,
  NavBarWrapper,
  ContentWrapper,
} from '../../common/styles/SpotifyThemeStyle';
import Sidebar from 'src/common/components/Sidebar/Sidebar';
import NavBar from '../NavBar/NavBar';
import SpotifyContent from '../SpotifyContent/SpotifyContent';

function SpotifyTheme() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [navBackground, setNavBackground] = useState<boolean>(false);
  const [headerBackground, setHeaderBackground] = useState<boolean>(false);

  // helper function to pass into NavBarWrapper for styledcomponent dynamic attribute
  const bodyScrolled = () => {
    if (bodyRef.current !== null) {
      bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
      bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);
    }
  };

  return (
    <SpotifyThemeContainer aria-label='spotify_theme_container'>
      <SidebarWrapper>
        <Sidebar />
        <NavBarWrapper ref={bodyRef} onScroll={bodyScrolled}>
          <NavBar navBackground={navBackground} />
          <ContentWrapper>
            <SpotifyContent headerBackground={headerBackground} />
          </ContentWrapper>
        </NavBarWrapper>
      </SidebarWrapper>
    </SpotifyThemeContainer>
  );
}

export default SpotifyTheme;
