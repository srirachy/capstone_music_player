import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './GlobalStyle';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from './app/redux/services/api/api';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <ApiProvider api={api}>
          <GlobalStyle />
          <App />
        </ApiProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
