import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux';
import VisualizerTheme from './VisualizerTheme';

test('load visualizer container element', async () => {
  render(
    <Provider store={store}>
      <VisualizerTheme />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/visualizer_theme/i);
  expect(linkElement).toBeInTheDocument();
});
