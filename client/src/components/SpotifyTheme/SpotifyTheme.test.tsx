import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import SpotifyTheme from './SpotifyTheme';

test('check if search component loads', async () => {
  render(
    <Provider store={store}>
      <SpotifyTheme />
    </Provider>,
  );
  const linkElement = screen.getByPlaceholderText(
    /what do you want to listen to/i,
  );
  expect(linkElement).toBeInTheDocument();
});
