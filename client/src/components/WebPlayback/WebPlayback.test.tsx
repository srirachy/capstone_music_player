import { render, screen } from '@testing-library/react';
import WebPlayback from './WebPlayback';

test('allow user to authenticate', () => {
  render(<WebPlayback token="meow" />);
  const linkElement = screen.getByText(/Instance not active./i);
  expect(linkElement).toBeInTheDocument();
});
