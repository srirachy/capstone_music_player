import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Footer from './Footer';

test('load footer container element', async () => {
  render(
    <Provider store={store}>
      <Footer />
    </Provider>,
  );
  const linkElement = screen.getByLabelText(/footer_container/i);
  expect(linkElement).toBeInTheDocument();
});
