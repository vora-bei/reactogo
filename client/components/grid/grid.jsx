'use strict';

import React from 'react';

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({});
    }

    render() {
        return (
            <table>
                <thead>
                    <th>
                        <td></td>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}