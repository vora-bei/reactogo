'use strict';

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Sortable } from 'react-sortable';
export default
class Grid extends React.Component {
//https://github.com/SortableJS/react-mixin-sortablejs
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(...props) {
        this.props.onChangeDirection(...props)
    }

    render() {
        return (
            <table>
                <GridHeader columns={this.props.columns} onChangeDirection={this.onChange}/>
                <GridBody {...this.props}/>
            </table>
        );
    }
}
Grid.propTypes = {
    columns: ImmutablePropTypes.list.isRequired,
    data: ImmutablePropTypes.list.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired

}
export class GridHeaderItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let column=this.props.column;
        return (<th>{column.get('title')}
            <ArrowControl onChangeDirection={(i)=> {
                this.props.onChangeDirection.call(this, column.get('name'), i)
            }} direction={column.get('sort')}/>
        </th>);
    }
}
GridHeaderItem.propTypes = {
    column: ImmutablePropTypes.map.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired
}
let SortableGridHeaderItem=Sortable(GridHeaderItem)
export class GridHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <thead>
                <tr>
                {this.props.columns.map((column)=> {
                    let childProps={column:column,onChangeDirection:this.props.onChangeDirection};
                    return <SortableGridHeaderItem
                        key={column.get('name')}
                        childProps={childProps}
                        column={column}

                    />
                })}
                </tr>
            </thead>
        );
    }
}
GridHeader.propTypes = {
    columns: ImmutablePropTypes.list.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired
}
export class GridFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tfoot>
                <td>
                {this.props.columns.map(function (column) {
                    return <td>{column.title}
                        <ArrowControl onChangeDirection={(i)=> {
                            this.props.onChangeDirection.bind(this, column.get('name'), i)
                        }} direction={column.order} key={column.get('name')}/>
                    </td>
                })}
                </td>
            </tfoot>
        );
    }
}
GridFooter.propTypes = {
    columns: ImmutablePropTypes.list.isRequired,
    onChangeDirection: React.PropTypes.func.isRequired
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
            <span onClick={this.onChange}>
                {this.props.direction === 1 ? 'ASC' : ''}
                {this.props.direction === -1 ? 'DESC' : ''}
                {this.props.direction === 0 ? '-' : ''}
            </span>
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
                        sort = column.get('sort') * String(a.get(name)).localeCompare(String(b.get(name)))
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
                return (<tr key={i}>{columns.map((column) => <td key={column.get('name')}>{row.get(column.get('name'))}</td>)}</tr>)
            })}
            </tbody>
        );
    }
}
GridBody.propTypes = {
    columns: ImmutablePropTypes.list.isRequired,
    data: ImmutablePropTypes.list.isRequired
}