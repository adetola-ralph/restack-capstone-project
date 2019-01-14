import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// root component
import App from './components/App';

import '@fortawesome/fontawesome-free/css/all.css';

// redux store
import configureStore from './store';

const store = configureStore();

const renderApp = (_App) => {
  render(
    <Provider store={store}>
      <_App />
    </Provider>, document.querySelector('#app'));
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    renderApp(NextApp);
  });
}

renderApp(App);
