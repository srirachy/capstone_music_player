import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Sidebar from './Sidebar';

test('test if side bar list items are on the screen', async () => {
  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>,
  );
  const homeElement = screen.getByText(/home/i);
  const libraryElement = screen.getByText(/your library/i);
  const searchElement = screen.getByText(/search/i);
  expect(homeElement).toBeInTheDocument();
  expect(libraryElement).toBeInTheDocument();
  expect(searchElement).toBeInTheDocument();
});
