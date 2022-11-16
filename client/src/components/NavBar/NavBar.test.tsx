import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import NavBar from './NavBar';

test('load search bar element', async () => {
  render(
    <Provider store={store}>
      <NavBar navBackground={false} />
    </Provider>,
  );
  const linkElement = screen.getByPlaceholderText(
    /what do you want to listen to/i,
  );
  expect(linkElement).toBeInTheDocument();
});
