import { render, screen } from '@testing-library/react';
import MusicPlayer from './MusicPlayer';

test('allow user to authenticate', async () => {
  render(<MusicPlayer />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
