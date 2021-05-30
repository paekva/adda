import {createStore} from "redux";
import rootReducer from "./reducers";

export const initialState = {
  userToken: null,
  authFailMessage: null,
};

const store = createStore(rootReducer);

export default store;
