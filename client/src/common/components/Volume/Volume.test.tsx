import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/redux';
import Volume from './Volume';

test('load discover container element', async () => {
  render(
    <Provider store={store}>
      <Volume />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/volume_container/i);
  expect(linkElement).toBeInTheDocument();
});
