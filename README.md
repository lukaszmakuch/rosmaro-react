# Rosmaro for React

This repository contains a [React](http://reactjs.org) component that allows to build user interfaces which behavior is modeled using _visual automata-based programming_.

---

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