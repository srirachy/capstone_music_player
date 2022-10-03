import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Login from './Login';

test('load login button', async () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
