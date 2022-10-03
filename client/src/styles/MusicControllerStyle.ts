import styled from 'styled-components';

export const ControllerContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: #ffffff;
    }
  }
`;

export const ShuffleWrapper = styled.div`
  font-size: 1rem;
`;

export const PrevWrapper = styled.div`
  font-size: 2rem;
`;

export const PlayPauseWrapper = styled.div`
  font-size: 2rem;
  svg {
    color: #ffffff;
  }
`;

export const NextWrapper = styled.div`
  font-size: 2rem;
`;

export const RepeatWrapper = styled.div`
  font-size: 1rem;
`;
