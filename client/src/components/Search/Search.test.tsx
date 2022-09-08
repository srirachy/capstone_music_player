import { render, screen } from '@testing-library/react';
import Search from './Search';

test('allow user to authenticate', async () => {
  render(<Search />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
