# Rosmaro for React

Leverage the power of [visual automata-based programming](https://rosmaro.js.org) to build [React](https://reactjs.org) components!

This package lets you build a _React component_ which [Rosmaro](https://rosmaro.js.org) state lives in [Redux](https://redux.js.org) and effects are managed in a declarative way with [Redux-saga](https://redux-saga.js.org).

---

# Using Rosmaro-React

## Installing dependencies
```
$ npm install --save rosmaro rosmaro-redux redux-saga redux rosmaro-react
$ mkdir -p src/bindings && touch src/graph.json
```

## The index.js file
```javascript
// IMPORTING DEPENDENCIES:

// This is the component factory function exported by this package.
import rosmaroComponent from 'rosmaro-react';

// The content of this file should be generated using the Rosmaro visual editor (https://rosmaro.js.org/editor/). For more information on drawing graphs please visit https://rosmaro.js.org/doc/#graphs
import graph from './graph.json';

// It's convenient to generate the bindings/index.js file using https://github.com/lukaszmakuch/rosmaro-tools
import makeBindings from './bindings';

// We need Rosmaro and React.
import rosmaro from 'rosmaro';
import React from 'react';
import ReactDOM from 'react-dom';

// Redux itself.
import {createStore, applyMiddleware} from 'redux';

// This will gives us a Rosmaro driven reducer and integrate it with Redux Saga.
import {makeReducer, effectDispatcher} from 'rosmaro-redux';

// We need to provide the Redux state.
import {Provider} from 'react-redux';

// Side-effects are handled by Redux Saga.
import createSagaMiddleware from 'redux-saga';

// For more information on Redux Saga please refer to the official documentation at https://redux-saga.js.org 
import rootSaga from './sagas';

// Writing handlers is easier with https://github.com/lukaszmakuch/rosmaro-binding-utils
import {typeHandler, partialReturns, defaultHandler} from 'rosmaro-binding-utils';

// SETTING THINGS UP:

// Makes writing handlers convenient.
const makeHandler = opts => partialReturns(typeHandler({defaultHandler})(opts));

// Rosmaro bindings are built with the handler factory defined above.
const bindings = makeBindings({makeHandler});

// This is the Rosmaro model.
const model = rosmaro({graph, bindings});

// The reducer is based on the Rosmaro model.
const rootReducer = makeReducer(model);

// For more information on connecting Rosmaro and Redux please check https://github.com/lukaszmakuch/rosmaro-redux 
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(effectDispatcher, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

// This component is driven by the `model` Rosmaro model.
// Its state lives in the provided Redux store.
// The selector function defines the exact location of the Rosmaro model state.
const App = rosmaroComponent({
  model,
  selector: state => state
});

// Rendering the component.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## Bindings

The most important thing is that every handler must react to the `RENDER` action. It is supposed to return a _React component_.

How the bindings are built doesn't really matter as long as they are correctly interpreted by Rosmaro. However, it's highly recommended to use [rosmaro-binding-utils](https://github.com/lukaszmakuch/rosmaro-binding-utils) and [rosmaro-tools](https://github.com/lukaszmakuch/rosmaro-tools) most of the time, as they make most of the things a lot easier and provide a directory structure.

Below is an example of a simple On/Off component.

We're going to focus on the `src/bindings` directory we created at the very beginning.

Let's give it the following structure:
```
$ tree -U
.
└── main
    ├── index.js
    ├── On
    │   └── index.js
    └── Off
        └── index.js
```
The `src/bindings/main/index.js` file contains the `main` node binding. We don't need anything fancy here, so it may use the default handler provided by [rosmaro-binding-utils](https://github.com/lukaszmakuch/rosmaro-binding-utils):
```javascript
// src/bindings/main/index.js
import {defaultHandler} from 'rosmaro-binding-utils';

export default () => ({handler: defaultHandler});
```
The `src/bindings/main/On/index.js` file is the `main:On` node binding. It's a simple button which when clicked makes the node follow the `clicked` arrow.
```javascript
// src/bindings/main/On/index.js
import React from 'react';
import {connect} from 'react-redux';

// This component is connected to the redux store, 
// so it can dispatch actions.
const View = connect()(({dispatch}) => 
  <button
    id="on-button"
    onClick={() => dispatch({type: 'CLICK'})}
    >on</button>
);

// The makeHandler function is passed to the makeBindings function
// in the src/index.js file.
export default ({makeHandler}) => ({
  handler: makeHandler({

    CLICK: () => ({arrow: 'clicked'}),

    RENDER: () => <View />,
  
  })
});
```
The `src/bindings/main/Off/index.js` file is a very similar button:
```javascript
// src/bindings/main/Off/index.js
import React from 'react';
import {connect} from 'react-redux';

const View = connect()(({dispatch}) => 
  <button
    id="off-button"
    onClick={() => dispatch({type: 'CLICK'})}
    >off</button>
);

export default ({makeHandler}) => ({
  handler: makeHandler({

    CLICK: () => ({arrow: 'clicked'}),

    RENDER: () => <View />,
  
  })
});
```
Now the `src/bindings/index.js` file, which is imported in the `src/index.js` file may be generated:
```
$ cd src/bindings
$ npx rosmaro-tools bindings:build .
Generated index.js!
```

The whole code of this example can be found in the `example` directory.

--- 
Links:
- [React documentation](http://reactjs.org) - how to build the UI layer
- [Rosmaro documentation](https://rosmaro.js.org/doc) - how to model changes of behavior
- [Redux documentation](https://redux.js.org) - about the object the Rosmaro state lives in
- [Redux-Saga documentation](https://redux-saga.js.org) - managing side effects in a declarative way