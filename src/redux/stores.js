import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducers} from './rootReducers';
import {rootSagas} from './rootSagas';

const saga = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(saga));
rootSagas.map(saga.run);

export default store;
