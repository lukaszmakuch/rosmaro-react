import React from 'react';
import {connect} from 'react-redux';

const View = connect()(({dispatch}) => <input
  type="button"
  id="on-button"
  value="on"
  onClick={() => dispatch({type: 'CLICK'})}
  />);

export default ({makeHandler}) => ({
  handler: makeHandler({

    CLICK: () => ({arrow: 'click'}),

    RENDER: () => <View />,
  
  })
});