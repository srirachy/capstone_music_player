import styled from 'styled-components';
import loginBkgd from 'src/assets/img/login_bkgd.webp';

export const LoginContainer = styled.article`
  max-width: 100vw;
  height: 100vh;
  background-image: url(${loginBkgd});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
`;

export const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: #000000;
    color: #1ab26b;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
