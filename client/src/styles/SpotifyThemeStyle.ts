import styled from 'styled-components';

export const SpotifyThemeContainer = styled.section`
  max-height: 85vh;
  max-width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh;
`;

export const SidebarWrapper = styled.div`
  display: grid;
  grid-template-columns: 15vw 85vw;
  height: 100%;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: rgb(32, 87, 100);
`;

export const NavBarWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.7rem;
    &-thumb {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
  scrollbar-width: thin;
`;

export const ContentWrapper = styled.div``;
