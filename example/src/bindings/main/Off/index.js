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