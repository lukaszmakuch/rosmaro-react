import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import graph from './graph.json';
import off from './off';
import on from './on';
import RosmaroReact from 'rosmaro-react';
import makeStorage from 'rosmaro-in-memory-storage';
import makeLock from 'rosmaro-process-wide-lock';
import registerServiceWorker from './registerServiceWorker';

const rosmaroOpts = {
  graph,
  handlers: {on, off},
  storage: makeStorage(),
  lock: makeLock(),
  afterTransition: () => {
    const counter = document.getElementById('transition-counter');
    counter.value = parseInt(counter.value, 10) + 1;
  }
};

const app = <RosmaroReact {...rosmaroOpts} />;

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
