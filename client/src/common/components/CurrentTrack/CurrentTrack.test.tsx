import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/redux';
import CurrentTrack from './CurrentTrack';

test('load current track container element', async () => {
  render(
    <Provider store={store}>
      <CurrentTrack />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/current_track_container/i);
  expect(linkElement).toBeInTheDocument();
});
