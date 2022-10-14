import styled from 'styled-components';

type MenuProp = {
  bkgdColor: string;
};

export const MenuItem = styled.div<MenuProp>`
  height: 10vh;
  width: 10vw;
  background-color: ${(props) => `${props.bkgdColor}`};
  color: #ffffff;
  font-size: 10px;
`;

// #1ab26b
// background-color: ${({ headerBackground }) =>
// headerBackground ? '#000000dc' : 'none'};
