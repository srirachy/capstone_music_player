import { render, screen } from '@testing-library/react';
import SpotifyTheme from './SpotifyTheme';

test('allow user to authenticate', async () => {
  render(<SpotifyTheme />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
