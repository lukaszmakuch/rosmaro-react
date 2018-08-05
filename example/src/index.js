import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import graph from './graph.json';
import rosmaro from 'rosmaro';
import makeBindings from './bindings';
import {Provider} from 'react-redux'
import {typeHandler, partialReturns, defaultHandler} from 'rosmaro-binding-utils';
import rosmaroComponent from 'rosmaro-react';
import {makeReducer, effectDispatcher} from 'rosmaro-redux';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';

const makeHandler = opts => partialReturns(typeHandler({defaultHandler})(opts));
const bindings = makeBindings({makeHandler});
const model = rosmaro({graph, bindings});

const saga = function* () {};

const rootReducer = makeReducer(model);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(effectDispatcher, sagaMiddleware)
);
sagaMiddleware.run(saga);

const App = rosmaroComponent({
  model,
  selector: state => state
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
