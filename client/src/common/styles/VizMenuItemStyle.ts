import styled from 'styled-components';

type MenuProp = {
  bkgdColor: string;
};

export const MenuItem = styled.div<MenuProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  letter-spacing: 4px;
  text-align: center;
  height: 10vh;
  width: 10vw;
  background-color: ${props => `${props.bkgdColor}`};
  color: #ffffff;
  cursor: pointer;
`;

// font-weight: bold;
