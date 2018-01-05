import React from 'react';

export default {

  click: () => ({arrow: 'click'}), 

  render: ({thisModel}) => {
    return <input
      type="button"
      id="off-button"
      value="off"
      onClick={() => thisModel.click()}
      />;
  }

}