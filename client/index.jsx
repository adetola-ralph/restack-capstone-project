import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// root component
import App from './App';

// redux store
import configureStore from './store';

const store = configureStore();

const renderApp = (_App) => {
  render(
    <Provider store={store}>
      <_App />
    </Provider>, document.querySelector('#app'));
};

renderApp(App);
