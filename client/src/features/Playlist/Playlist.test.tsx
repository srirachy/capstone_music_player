import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/redux';
import Playlist from './Playlist';

test('test to find unordered list in the component', async () => {
  render(
    <Provider store={store}>
      <Playlist />
    </Provider>,
  );
  const listEle = screen.getByRole('list');
  expect(listEle).toBeInTheDocument();
});
