import {createStore} from "redux";
import rootReducer from "./reducers";
import {AppRole} from "../api/user";
import {MenuItem} from "../types";

export type AppStore = {
    userToken: string | null,
    authFailMessage: string | null,
    roles: AppRole[];
    username: string | null;
    currentMenuItem: MenuItem | null
}

export const initialState: AppStore = {
    userToken: null,
    authFailMessage: null,
    roles: [],
    username: null,
    currentMenuItem: null
};

const store = createStore(rootReducer);

export default store;
