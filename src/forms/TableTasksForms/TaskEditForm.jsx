import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { deepOrangeA700 } from 'material-ui/styles/colors';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { destroyTaskForEditing, applyTaskChanges, deleteTask } from '../../redux/ActionCreators'
import { bindActionCreators } from 'redux'

class TaskEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = Object.assign({}, props, {
            taskTitle: props.taskForEditing.taskTitle,
            taskDescription: props.taskForEditing.taskDescription,
            taskPriority: props.taskForEditing.taskPriority,
            status: props.taskForEditing.status
        });
        this.handleClose = this.handleClose.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }


    handleClose() {
        this.props._destroyTaskForEditing();
    };

    saveChanges() {
        this.props._applyTaskChanges(this.state.taskForEditing, {
            owner: this.state.taskForEditing.owner,
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            taskPriority: this.state.taskPriority,
            status: this.state.status
        })
    }

    deleteTask() {
        this.props._deleteTask({
            owner: this.state.taskForEditing.owner,
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            taskPriority: this.state.taskPriority,
            status: this.state.status
        });
        this.props._destroyTaskForEditing();

    }

    render() {
        const actions = [
            <FlatButton label="Save" primary={true} onClick={this.saveChanges} />,
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />,
            <FlatButton label="Delete" style={{ color: deepOrangeA700 }} onClick={this.deleteTask} />
        ];
        return (
            <div>
                <Dialog
                    title="Edit Task" actions={actions} modal={true} open={this.state.open} >
                    <TextField hintText="Enter new title" floatingLabelText="Title" value={this.state.taskTitle}
                        onChange={(event, newValue) => this.setState({ taskTitle: newValue })} />
                    <TextField hintText="Enter new description" floatingLabelText="Description" value={this.state.taskDescription}
                        onChange={(event, newValue) => this.setState({ taskDescription: newValue })} />
                    <TextField hintText="Enter new priority" type="number" floatingLabelText="Priority" value={this.state.taskPriority}
                        onChange={(event, newValue) => this.setState({ taskPriority: (newValue > 10 ? 10 : newValue < 1 ? 1 : newValue) })} />
                    <TextField hintText="Enter new status" floatingLabelText="Status" value={this.state.status}
                        onChange={(event, newValue) => this.setState({ status: newValue })} />
                    <br />
                </Dialog>
            </div>
        );
    }
}

TaskEditForm.propTypes = {
    taskForEditing: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
    return {
        taskForEditing: state.taskForEditing,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        _destroyTaskForEditing: bindActionCreators(destroyTaskForEditing, dispatch),
        _applyTaskChanges: bindActionCreators(applyTaskChanges, dispatch),
        _deleteTask: bindActionCreators(deleteTask, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditForm);