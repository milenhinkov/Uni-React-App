export default function addTaskToUser(state = { user: { userName: "" }, task: { owner: "" } }, action){
  debugger;
  switch (action.type) {
    case 'ADD_TASK':
      let newState = JSON.parse(JSON.stringify(state));
      newState.task.owner = state.user.userName;
      return newState;
    default:
      return state;
  }
}

