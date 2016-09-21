'use strict';

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
export default class Grid extends React.Component {
//https://github.com/SortableJS/react-mixin-sortablejs
    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        columns: ImmutablePropTypes.list.isRequired,
        data: ImmutablePropTypes.list.isRequired,
    }

    onChange() {
        this.setState({});
    }

    render() {
        return (
            <table>
                <GridHeader columns={this.props.columns}/>
                <GridBody {...this.props}/>
                <GridFooter {...this.props}/>
            </table>
        );
    }
}
export class GridHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        columns: ImmutablePropTypes.list.isRequired,
        onChangeDirection: React.PropTypes.func.isRequired
    }

    render() {
        return (
            <thead>
            <th>
                {this.props.columns.map(function (column) {
                    return <td>{column.title} <ArrowControl onChangeDirection={(i)=> {
                        this.props.onChangeDirection.bind(this, column.name, i)
                    }} direction={column.order} key={column.name}/></td>
                })}
            </th>
            </thead>
        );
    }
}
export class GridFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        columns: ImmutablePropTypes.list.isRequired,
        onChangeDirection: React.PropTypes.func.isRequired
    }

    render() {
        return (
            <tfoot>
            <td>
                {this.props.columns.map(function (column) {
                    return <td>{column.title} <ArrowControl onChangeDirection={(i)=> {
                        this.props.onChangeDirection.bind(this, column.name, i)
                    }} direction={column.order} key={column.name}/></td>
                })}
            </td>
            </tfoot>
        );
    }
}
export class ArrowControl extends React.Component {
    static propTypes = {
        direction: React.PropTypes.number.isRequired,
        onChangeDirection: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.props.this.setState((this.props.direction + 2) % 3 - 1);
    }

    render() {
        return (
            <span onClick={this.onChange}>
                {this.props.direction === 1 ? 'ASC' : ''}
                {this.props.direction === -1 ? 'DESC' : ''}
                {this.props.direction === 0 ? '-' : ''}
            </span>
        );
    }
}
export class GridBody extends React.Component {
    static propTypes = {
        columns: ImmutablePropTypes.list.isRequired,
        data: ImmutablePropTypes.list.isRequired,
    }

    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({});
    }

    sort() {
        var data = this.props.data;
        var columns = this.props.columns,directionColumns=columns.filter(function (column) {
            return column.get('direction');
        });
       return data.sort(
            function (a, b) {
                directionColumns.forEach(function (column) {
                    let name=column.get('name');
                   00 column.get('direction')* a.get(name).localeCompare(b.get(name))
                })
                return a.get('name').localeCompare(b.get('name'))
            }
        );
    }

    render() {
        var columns = this.props.columns, data = this.sort();
        return (
            <tbody>
            {data.map(function (column) {
                return (<tr> {columns.map(function (column) {
                    return <td>{column.name}</td>
                })}</tr>)
            })}
            </tbody>
        );
    }
}