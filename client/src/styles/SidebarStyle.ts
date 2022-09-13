import styled from 'styled-components';

export const SidebarContainer = styled.div`
  background-color: #000000;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    gap: 1rem;
    padding: 1rem;
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: #ffffff;
      }
    }
  }
`;

export const LogoWrapper = styled.div`
  text-align: center;
  margin: 1rem 0;
  img {
    max-inline-size: 80%;
    block-size: auto;
  }
`;
