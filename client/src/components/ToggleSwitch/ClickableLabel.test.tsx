import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ClickableLabel from './ClickableLabel';

test('load label element', async () => {
  render(
    <Provider store={store}>
      <ClickableLabel title="" onChange={() => ''} id="" />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/switch_label/i);
  expect(linkElement).toBeInTheDocument();
});
