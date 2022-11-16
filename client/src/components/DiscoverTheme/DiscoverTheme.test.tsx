import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import DiscoverTheme from './DiscoverTheme';

test('load discover container element', async () => {
  render(
    <Provider store={store}>
      <DiscoverTheme />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/discover/i);
  expect(linkElement).toBeInTheDocument();
});
