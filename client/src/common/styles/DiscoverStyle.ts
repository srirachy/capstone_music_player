import styled from 'styled-components';
import wipBkgd from 'src/assets/img/wip.webp';

export const DiscoverContainer = styled.article`
  max-width: 100vw;
  height: 100vh;
  background-image: url(${wipBkgd});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
`;
