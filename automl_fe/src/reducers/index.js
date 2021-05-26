import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { modelReducer } from './modelReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  model: modelReducer
})