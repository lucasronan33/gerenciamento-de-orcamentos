import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules/rootReducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './modules/rootSaga';
import { persistStore } from 'redux-persist';

import persistedReducers from './modules/reduxPersist'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    persistedReducers(rootReducer),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
export default store