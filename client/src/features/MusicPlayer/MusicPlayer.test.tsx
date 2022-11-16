import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/redux';
import MusicPlayer from './MusicPlayer';

test('check that search component loads', async () => {
  render(
    <Provider store={store}>
      <MusicPlayer />
    </Provider>,
  );
  const linkElement = screen.getByPlaceholderText(/what do you want to listen to/i);
  expect(linkElement).toBeInTheDocument();
});
