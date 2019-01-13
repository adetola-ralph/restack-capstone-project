import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

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

const createStore = (initialState) => createStore(() => {}, initialState, applyMiddleware(...middlewares()));

export default createStore;
