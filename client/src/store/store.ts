import {createStore} from "redux";
import rootReducer from "./reducers";
import {Product} from "../types/Product";
import {AppRole} from "../api/user";

export type AppStore = {
    userToken: string | null,
    authFailMessage: string | null,
    products: Product[];
    roles: AppRole[];
    username: string | null;
}

export const initialState: AppStore = {
    userToken: null,
    authFailMessage: null,
    products: [],
    roles: [],
    username: null,
};

const store = createStore(rootReducer);

export default store;
