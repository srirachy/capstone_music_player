import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/redux';
import SpotifyContent from './SpotifyContent';

test('load playlist element', async () => {
  render(
    <Provider store={store}>
      <SpotifyContent headerBackground={false} />
    </Provider>,
  );
  const linkElement = screen.getByText(/playlist/i);
  expect(linkElement).toBeInTheDocument();
});
