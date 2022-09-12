import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

test('allow user to authenticate', async () => {
  render(<Sidebar />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
