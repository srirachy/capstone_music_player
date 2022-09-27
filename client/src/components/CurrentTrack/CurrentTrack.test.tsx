import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import CurrentTrack from './CurrentTrack';

test('allow user to authenticate', async () => {
  render(
    <Provider store={store}>
      <CurrentTrack />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(
    /current_track_container/i,
  );
  expect(linkElement).toBeInTheDocument();
});
