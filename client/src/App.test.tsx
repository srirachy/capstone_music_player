import { render, screen } from '@testing-library/react';
import App from './App';

test('show login if token is invalid', async () => {
  render(<App />);
  const linkElement = screen.getByText(/Login with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
