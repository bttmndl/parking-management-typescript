import { createStore } from "redux";
import actionReducer from './actionReducer';
const store = createStore(actionReducer);
export default store;