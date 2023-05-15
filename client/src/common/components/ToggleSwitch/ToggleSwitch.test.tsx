import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux';
import ToggleSwitch from './ToggleSwitch';

test('load toggle switch element', async () => {
  render(
    <Provider store={store}>
      <ToggleSwitch vals={['']} curSelect='' />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/toggle_switch/i);
  expect(linkElement).toBeInTheDocument();
});
