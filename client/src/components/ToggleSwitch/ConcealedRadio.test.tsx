import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ConcealedRadio from './ConcealedRadio';

test('load switch radio element', async () => {
  render(
    <Provider store={store}>
      <ConcealedRadio value="" selected="" />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/switch_radio/i);
  expect(linkElement).toBeInTheDocument();
});
