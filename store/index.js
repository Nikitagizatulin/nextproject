import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { requestsPromiseMiddleware } from 'redux-saga-requests';
import todosReducer from './todos/reducer';
import userReducer from './user/reducer';

import saga from './saga';
import logger from './middlewares/logger';

const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

const makeStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(requestsPromiseMiddleware({
        auto: true
      }), thunk, logger, sagaMiddleware),
    ),
  );
  sagaMiddleware.run(saga);
  return store;
};

export default makeStore;
