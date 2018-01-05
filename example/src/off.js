import React from 'react';

export default {

  click: async () => ({arrow: 'click'}), 

  render: async ({thisModel}) => {
    return <input
      type="button"
      id="on-button"
      value="on"
      onClick={() => thisModel.click()}
      />;
  }

}