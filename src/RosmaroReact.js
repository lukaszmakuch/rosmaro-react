import {connect} from 'react-redux'

const makeRender = model => state => model({state, action: ({type: 'RENDER'})}).result.data;

const mapStateToProps = selector => wholeState => selector(wholeState).state;

export default ({selector, model}) => 
  connect(mapStateToProps(selector))(makeRender(model));