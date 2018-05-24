import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { closeNewTaskDialog, addNewTask } from '../../redux/ActionCreators'
import { bindActionCreators } from 'redux'

class NewTaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = Object.assign({}, props, {
            taskTitle: "Default title",
            taskDescription: "Default description",
            taskPriority: 1,
            status: "finished"
        });
        this.handleClose = this.handleClose.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    handleClose() {
        this.props._closeNewTaskDialog();
    }

    saveChanges() {
        this.props._addNewTask({
            owner: this.state.currentUser.username,
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            taskPriority: this.state.taskPriority,
            status: this.state.status,
        });
        this.props._closeNewTaskDialog();
    }

    render() {
        const actions = [
            <FlatButton label="Save" primary={true} onClick={this.saveChanges} />,
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />,
        ];
        return (
            <div>
                <Dialog
                    title="New Task" actions={actions} modal={true} open={this.state.open} >
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

NewTaskForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
    shouldOpenNewTaskDialog: PropTypes.bool.isRequired,
    _addNewTask: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
    return {
        currentUser: state.currentUser,
        shouldOpenNewTaskDialog: state.newTaskDialog
    }
}

function mapDispatchToProps(dispatch) {
    return {
        _closeNewTaskDialog: bindActionCreators(closeNewTaskDialog, dispatch),
        _addNewTask: bindActionCreators(addNewTask, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);