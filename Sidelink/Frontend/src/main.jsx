import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'src/assets/styles/globals.scss';
import App from './App.jsx';
import store from 'src/store/Store';

createRoot(document.getElementById('spa')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
