import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import SpotifyTheme from './SpotifyTheme';

test('load spotify theme container', async () => {
  render(
    <Provider store={store}>
      <SpotifyTheme />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(
    /spotify_theme_container/i,
  );
  expect(linkElement).toBeInTheDocument();
});
