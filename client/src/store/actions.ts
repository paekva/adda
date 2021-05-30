import {AppRole} from "../api/user";
import {Product} from "../types/Product";

export enum StateChangeActionType {
    SET_TOKEN = "SET_TOKEN",
    SET_AUTH_FAIL = "SET_AUTH_FAIL",
    SET_ADMIN_ROLE = "SET_ADMIN_ROLE",
    SET_PRODUCTS_LIST = "SET_PRODUCTS_LIST",
}

type SetToken = {
    type: StateChangeActionType.SET_TOKEN;
    payload: string | null;
};

type SetAuthFail = {
    type: StateChangeActionType.SET_AUTH_FAIL;
    payload: string | null;
};

type SetAdminRole = {
    type: StateChangeActionType.SET_ADMIN_ROLE;
    payload: {
        roles: AppRole[];
        userName: string | null;
    };
};

type SetProductsList = {
    type: StateChangeActionType.SET_PRODUCTS_LIST;
    payload: Product[];
};


export type StateChangeActions =
    | SetToken
    | SetAuthFail
    | SetAdminRole
    | SetProductsList;