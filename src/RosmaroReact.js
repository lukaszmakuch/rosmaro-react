import React from 'react';
import rosmaro from 'rosmaro';

class RosmaroReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null
    };
    this.refreshView = () => Promise.resolve(this.model.render())
      .then(view => this.setState({view}));
    this.model = rosmaro(Object.assign({}, this.props, {
      afterTransition: () => {
        if (this.props.afterTransition) this.props.afterTransition();
        this.refreshView();
      }
    }));
  }

  componentDidMount() {
    this.refreshView();
  }

  render() {
    return this.state.view;
  }
}

export default RosmaroReact;