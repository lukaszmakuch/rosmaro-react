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