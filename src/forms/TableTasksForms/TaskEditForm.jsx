import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { deepOrangeA700 } from 'material-ui/styles/colors';

export default class TaskEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        style={{color:deepOrangeA700}}
      />
    ];

    return (
      <div>
        <Dialog
          title="Edit Task"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            hintText="Enter new title"
            floatingLabelText="Title" />
          <TextField
            hintText="Enter new description"
            floatingLabelText="Description" />
          <TextField
            hintText="Enter new priority"
            floatingLabelText="Priority" />
          <br />
        </Dialog>
      </div>
    );
  }
}