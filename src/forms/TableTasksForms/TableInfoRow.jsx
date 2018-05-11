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
        this.DrowRows = this.DrowRows.bind(this);
    }

    DrowButton() {
        if (this.props.isEditable) {
            return <TableRowColumn><RaisedButton label="Edit" primary={true}/*  onClick={(ev) => { console.log(Object.keys(this.state.info.tasks) + " : " + Object.values(this.state.info.tasks)) }} */ /></TableRowColumn>
        }
        return null;
    }

    DrowRows(){
        return Object.values(this.state.info.tasks).map((task, i) => {
            return(
                <TableRow key={i} >
                <TableRowColumn>{this.state.info.userName}</TableRowColumn>
                <TableRowColumn>{task.TaskTitle}</TableRowColumn>
                <TableRowColumn>{task.TaskDescription}</TableRowColumn>
                <TableRowColumn>{task.TaskPriority}</TableRowColumn>
                {this.DrowButton()}
            </TableRow>)
        })
    }

    render() {
        return (this.DrowRows());
    }
}