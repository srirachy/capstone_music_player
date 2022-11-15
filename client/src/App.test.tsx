import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/redux';
import App from './app/App';

test('show login if token is invalid', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
