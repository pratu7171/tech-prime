import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { projectReducer } from "./project/project.reducer";

const rootReducer = combineReducers({ authReducer, projectReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));


export { store };
