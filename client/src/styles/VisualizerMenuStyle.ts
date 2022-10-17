import styled from 'styled-components';

export const VizMenuContainer = styled.div`
  z-index: 1;
  position: absolute;
  max-width: 20vw;
  max-height: 40vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 0.7rem;
    &-thumb {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
`;
