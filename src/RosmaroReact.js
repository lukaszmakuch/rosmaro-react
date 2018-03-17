import React from 'react';
import rosmaro from 'rosmaro';

class RosmaroReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null
    }

  }

  refreshView() {
    Promise.resolve(
      rosmaro(Object.assign({}, this.props, {
        afterTransition: () => {
          if (this.props.afterTransition) this.props.afterTransition();
          this.refreshView();
        }
      })).render()).then(view => this.setState({ view }))
  }

  componentDidMount() {
    this.refreshView();
  }

  render() {
    return this.state.view;
  }
}

export default RosmaroReact;