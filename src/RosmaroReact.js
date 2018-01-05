import React from 'react';
import rosmaro from 'rosmaro';

class RosmaroReact extends React.Component {
  constructor(props) {
    super(props);
    this.view = null;

    this.refreshView = () => {
      Promise.resolve(model.render()).then(view => {
        this.view = view;
        this.forceUpdate();
      })
    };

    const model = rosmaro(Object.assign({}, props, {
      afterTransition: () => {
        if (props.afterTransition) props.afterTransition();
        this.refreshView();
      }
    }));
  }

  componentDidMount() {
    this.refreshView();
  }

  render() {
    return this.view;
  }
};

export default RosmaroReact;