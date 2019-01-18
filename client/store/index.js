import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import reducers from './reducer';

const middlewares = () => {
  const middleware = [
    logger,
    thunk,
  ];

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(reduxImmutableStateInvariant());
  }

  return middleware;
};

const configureStore = initialState => createStore(
  reducers, initialState, applyMiddleware(...middlewares()),
);

export default configureStore;
