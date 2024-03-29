import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';
// Context API Providers
// import { UserProvider } from './contexts/user.context';
// import { CategoriesProvider } from './contexts/categories.context';
// import { CartProvider } from './contexts/cart.context';
/* 
      Old Context API Providers
      <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
      </UserProvider> */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Redux uses Context API for provider under the hood */}
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
