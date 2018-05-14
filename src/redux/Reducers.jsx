const task = (state = {user,task}, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        let newState =JSON.parse(JSON.stringify(state));
        newState.task.owner = user.userName;
        return newState;
      default:
        return state
    }
  }
  ​