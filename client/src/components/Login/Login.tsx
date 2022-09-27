import {
  LoginContainer,
  ContentWrapper,
} from '../../styles/LoginStyle';

function Login() {
  const connectSpotify = () => {
    window.location.href = 'http://localhost:9000/auth/login'; // is there a way to thunk this?
  };
  return (
    <LoginContainer>
      <ContentWrapper>
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          alt="spotify logo"
        />
        <button type="button" onClick={connectSpotify}>
          Login with Spotify
        </button>
      </ContentWrapper>
    </LoginContainer>
  );
}

export default Login;
