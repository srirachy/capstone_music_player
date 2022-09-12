import { render, screen } from '@testing-library/react';
import SpotifyContent from './SpotifyContent';

test('allow user to authenticate', async () => {
  render(<SpotifyContent />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
