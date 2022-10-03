import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import MusicController from './MusicController';

test('load controller container element', async () => {
  render(
    <Provider store={store}>
      <MusicController />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/controller_container/i);
  expect(linkElement).toBeInTheDocument();
});
