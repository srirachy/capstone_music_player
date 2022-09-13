import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Footer from './Footer';

test('allow user to authenticate', async () => {
  render(
    <Provider store={store}>
      <Footer />
    </Provider>,
  );
  const linkElement = screen.getByText(/meow--fooptper/i);
  expect(linkElement).toBeInTheDocument();
});
