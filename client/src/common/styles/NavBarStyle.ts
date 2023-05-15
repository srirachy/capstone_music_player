import styled from 'styled-components';
import { NavBkgdType } from '../models';

export const NavContainer = styled.section<NavBkgdType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) => (navBackground ? 'rgba(0, 0, 0, 0.7)' : 'none')};
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 30%;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  gap: 0.5rem;
  input {
    border: none;
    height: 2rem;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  padding: 0.3rem 0.4rem;
  padding-right: 1rem;
  border-radius: 2rem;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    svg {
      font-size: 1.3rem;
      background-color: #282828;
      padding: 0.2rem;
      border-radius: 1rem;
      color: #c7c5c5;
    }
  }
`;
