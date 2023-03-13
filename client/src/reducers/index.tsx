import { combineReducers } from 'redux';

import posts from './postReducers';

export const reducers = combineReducers({ posts });