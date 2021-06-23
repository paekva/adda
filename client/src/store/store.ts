import {createStore} from "redux";
import rootReducer from "./reducers";
import {AppRole} from "../api/user";
import {MenuItem, Order} from "../types";

export type AppStore = {
    userToken: string | null,
    authFailMessage: string | null,
    roles: AppRole[];
    username: string | null;
    currentMenuItem: MenuItem | null
    lastSelectedOrder: Order | null
    message: string | null
}

export const initialState: AppStore = {
    userToken: null,
    authFailMessage: null,
    roles: [],
    username: null,
    currentMenuItem: null,
    lastSelectedOrder: null,
    message: null
};

const store = createStore(rootReducer);

export default store;
