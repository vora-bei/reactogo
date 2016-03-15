// Libs
import { connect } from 'react-redux';

// Components
import Header from 'header/header.jsx';
import RouteTransition from 'route-transition.jsx';

let Index = (props) =>
  (<div>
    <Header />
    <RouteTransition pathname={props.currentPath}>
      {props.children}
    </RouteTransition>
  </div>);

Index.displayName = 'Index';

export default connect((state) => ({
  currentPath: state.get('routing').get('locationBeforeTransitions').get('pathname'),
}))(Index);
