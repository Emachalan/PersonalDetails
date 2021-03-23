import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducer from './rootReducer';

export default function configureStore() {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();

  middleware.push(sagaMiddleware);

  const enhancer = compose(
    applyMiddleware(...middleware),
  );
  const store = createStore(reducer, enhancer);

  if (sagaMiddleware) {
    sagaMiddleware.run(sagas);
  }
  return { store };
}
