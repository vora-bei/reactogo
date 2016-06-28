// Libs
import { connect } from 'react-redux';
import grid from 'grid/grid.jsx';
// Actions
import { requestData } from 'grid.js';

class Grid extends React.Component {
    componentWillMount(){
        this.props.dispatch(requestData())
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (<grid dataProvider={this.props.dataProvider} columns={this.props.columns}></grid>);
    }
}


export default connect((state) => ({data: state.get('data'), columns: state.get('columns')}))(Grid);

