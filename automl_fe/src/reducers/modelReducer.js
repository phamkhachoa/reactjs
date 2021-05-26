export const modelReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return action.payload;
    default:
      return state;
  }
}