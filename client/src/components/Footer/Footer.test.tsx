import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('allow user to authenticate', async () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
