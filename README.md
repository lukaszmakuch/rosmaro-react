# Rosmaro for React

This repository contains a [React](http://reactjs.org) component that allows to build user interfaces which behavior is modeled using _visual automata-based programming_.

---

# The Snippet
```
npm install --save rosmaro rosmaro-in-memory-storage rosmaro-process-wide-lock rosmaro-react
mkdir src/handlers && touch src/handlers/all.js && touch src/graph.json
```

```javascript
import makeStorage from 'rosmaro-in-memory-storage';
import makeLock from 'rosmaro-process-wide-lock';
import RosmaroReact from 'rosmaro-react';
import graph from './graph.json'; // The generated graph
import handlers from './handlers/all';

// ...

const rosmaroOpts = {
  graph,
  handlers,
  storage: makeStorage(),
  lock: makeLock()
};

ReactDOM.render(<RosmaroReact {...rosmaroOpts} />, document.getElementById('root'));
```

# How to use RosmaroReact?

First, we need to get the component.
```
npm i rosmaro-react --save
```

Please bear in mind that in order to use this package, [rosmaro](https://rosmaro.js.org) must be installed as well.
```
npm i rosmaro --save
```

Then, we can import it.
```javascript
import RosmaroReact from 'rosmaro-react';
```

It gives us a component that takes as props everything the regular _rosmaro_ factory function takes.
```javascript
import RosmaroReact from 'rosmaro-react';

// ...

const rosmaroOpts = {
  graph,
  handlers,
  storage,
  lock,
  afterTransition
};

const rosmaroDrivenComponent = <RosmaroReact {...rosmaroOpts} />;

ReactDOM.render(
  rosmaroDrivenComponent, 
  document.getElementById('root')
);
```

Most of the time, we're going to use it with [rosmaro-in-memory-storage](https://github.com/lukaszmakuch/rosmaro-in-memory-storage) and [rosmaro-process-wide-lock](https://github.com/lukaszmakuch/rosmaro-process-wide-lock). 

The created __Rosmaro model MUST handle the _render_ method__. It takes no user provided arguments and returns some React component. For example:

```javascript
// Some handler
import React from 'react';

export default {
  render: ({ctx, thisModel}) => <div>Rosmaro says Hello!</div>
};
```

--- 
Links:
- [React documentation](http://reactjs.org) - how to build the UI layer itself
- [Rosmaro documentation](https://rosmaro.js.org/doc) - how to model changes of the UI