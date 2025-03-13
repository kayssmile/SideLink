import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'src/assets/styles/globals.scss';
import App from './App.jsx';

import store from 'src/store/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('spa')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
