import { render, screen } from '@testing-library/react';
import WebPlayback from './WebPlayback';

test('allow user to authenticate', () => {
  render(<WebPlayback />);
  const linkElement = screen.getByText(/Instance not active./i);
  expect(linkElement).toBeInTheDocument();
});
