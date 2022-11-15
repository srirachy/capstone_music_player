import styled from 'styled-components';
import { HeaderBkgdType } from 'src/common/models';

export const ContentContainer = styled.section`
  font-size: 1rem;
`;

export const ListInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0 2rem;
`;

export const ImageWrapper = styled.div`
  img {
    height: 15rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  }
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #e0dede;
  h1 {
    color: #ffffff;
    font-size: 4rem;
  }
`;

export const SongListContainer = styled.div`
  font-size: 1rem;
`;

export const HeaderRow = styled.div<HeaderBkgdType>`
  display: grid;
  grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
  color: #dddcdc;
  margin: 1rem 0 0 0;
  position: sticky;
  top: 15vh;
  padding: 1rem 3rem;
  transition: 0.3s ease-in-out;
  background-color: ${({ headerBackground }) => (headerBackground ? '#000000dc' : 'none')};
`;

export const HeaderCol = styled.div`
  display: flex;
  align-items: center;
  color: #dddcdc;
`;

export const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  margin-bottom: 5rem;
`;

export const SongRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export const SongCol = styled.div`
  display: flex;
  align-items: center;
  color: #dddcdc;
`;

export const SongColDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #dddcdc;
`;

export const SongImageWrapper = styled.div`
  img {
    height: 40px;
    width: 40px;
  }
`;

export const SongInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
