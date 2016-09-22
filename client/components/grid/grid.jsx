'use strict';

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
export default class Grid extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <table>
                <GridHeader
                    columns={this.props.columns}
                    onChangeDirection={ this.props.onChangeDirection}
                    onChangeColumnOrder={this.props.onChangeColumnOrder}/>
                <GridBody {...this.props}/>
            </table>
        );
    }
}
Grid.propTypes = {
    columns: ImmutablePropTypes.list.isRequired,
    data: ImmutablePropTypes.list.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired,
    onChangeColumnOrder: React.PropTypes.func.isRequired

}
export class GridHeaderItem extends React.Component {
    render() {
        let column = this.props.column;
        return (<th>
            <span onClick={()=>this.props.onChangeColumnOrder(column.get('name'),-1)}>[&larr;]</span>
            {column.get('title')}
            <ArrowControl onChangeDirection={(i)=> {
                this.props.onChangeDirection.call(this, column.get('name'), i)
            }} direction={column.get('sort')}/>
            <span onClick={()=>this.props.onChangeColumnOrder(column.get('name'),1)}>[&rarr;]</span>
        </th>);
    }
}
GridHeaderItem.propTypes = {
    column: ImmutablePropTypes.map.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired,
    onChangeColumnOrder: React.PropTypes.func.isRequired
}
export class GridHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <thead>
            <tr>
                {this.props.columns.map((column)=> {
                    return <GridHeaderItem
                        key={column.get('name')}
                        column={column}
                        onChangeDirection={this.props.onChangeDirection}
                        onChangeColumnOrder={this.props.onChangeColumnOrder}

                    />
                })}
            </tr>
            </thead>
        );
    }
}
GridHeader.propTypes = {
    columns: ImmutablePropTypes.list.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired,
    onChangeColumnOrder: React.PropTypes.func.isRequired

}
export class ArrowControl extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.props.onChangeDirection((this.props.direction + 2) % 3 - 1)
        //this.setState((this.props.direction + 2) % 3 - 1);
    }

    render() {
        return (
            <span onClick={this.onChange}>(
                {this.props.direction === 1 ? 'ASC' : ''}
                {this.props.direction === -1 ? 'DESC' : ''}
                {this.props.direction === 0 ? '-' : ''}
            )</span>
        );
    }
}
ArrowControl.propTypes = {
    direction: React.PropTypes.number.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired
}
export class GridBody extends React.Component {
    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({});
    }

    sort() {
        var data = this.props.data;
        var columns = this.props.columns, directionColumns = columns.filter(function (column) {
            return column.get('sort');
        });
        return data.sort(
            function (a, b) {
                var sort = 0;
                directionColumns.forEach(function (column) {
                    let name = column.get('name');
                    if (sort === 0) {
                        sort = column.get('sort') * (a.get(name) === b.get(name) ? 0 : (a.get(name) < b.get(name)) ? 1 : -1)
                    }
                })
                return sort;
            }
        );
    }

    render() {
        var columns = this.props.columns, data = this.sort();
        return (
            <tbody>
            {data.map(function (row, i) {
                return (<tr key={i}>{columns.map((column) => <td
                    key={column.get('name')}>{row.get(column.get('name'))}</td>)}</tr>)
            })}
            </tbody>
        );
    }
}
GridBody.propTypes = {
    columns: ImmutablePropTypes.list.isRequired,
    data: ImmutablePropTypes.list.isRequired
}