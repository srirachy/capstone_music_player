import { render, screen } from '@testing-library/react';
import Login from './Login';

test('allow user to authenticate', async () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
