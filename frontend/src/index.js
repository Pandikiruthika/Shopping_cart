import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store/store'
import { Provider } from 'react-redux';
 import { BrowserRouter } from 'react-router-dom'


const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
);

reportWebVitals();
