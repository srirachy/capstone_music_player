import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import MusicController from './MusicController';

test('check if component is loaded', async () => {
  render(
    <Provider store={store}>
      <MusicController />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/controller_container/i);
  expect(linkElement).toBeInTheDocument();
});
