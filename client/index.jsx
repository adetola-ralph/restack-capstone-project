import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// root component
import App from './components/App';
import { loadCategory } from './store/actions/categoryActions';

import '@fortawesome/fontawesome-free/css/all.css';

// redux store
import configureStore from './store';

const store = configureStore();
store.dispatch(loadCategory());

const renderApp = (AppComponent) => {
  render(
    <Provider store={store}>
      <AppComponent />
    </Provider>, document.querySelector('#app'),
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    renderApp(NextApp);
  });
}

renderApp(App);
