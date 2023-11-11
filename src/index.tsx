import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <PayPalScriptProvider
      options={{
        clientId:
          "AbzlTOscC7b3gML3ImuxYE6_W0F-LVxC9Utr25Y9mkcmYu89hNwOCkUWXDexWc5yrg77L5vDtZxg-ufz",
      }}
    >
    <Provider store={store}>  
    <App /> 
    </Provider> 
    </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);


