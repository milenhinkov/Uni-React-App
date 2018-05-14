import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class TableInfoRow extends Component {
    constructor(props) {
        super(props)
        this.state = props;

        this.DrowButton = this.DrowButton.bind(this);
        this.DrowRow = this.DrowRow.bind(this);
    }

    DrowButton(func) {
        if (this.props.isEditable) {
            return <TableRowColumn><RaisedButton label="Edit" primary={true}  onClick={func} /></TableRowColumn>
        }
        return null;
    }

    DrowRow(collection){
        return Object.keys(collection).map(prop => { return <TableRowColumn key={prop} >{collection[prop]}</TableRowColumn> })
    }

    render() {
        return (
            <TableRow>
                {this.DrowRow(this.state.info)}
                {this.DrowButton(this.state.onClick)}
            </TableRow>)
    }
}