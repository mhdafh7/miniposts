import { combineReducers } from "redux";

import posts from "./postReducers";
import auth from "./authReducers";

export const reducers = combineReducers({ posts, auth });
