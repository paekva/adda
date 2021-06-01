import {AppRole} from "../api/user";
import {MenuItem} from "../types";

export enum StateChangeActionType {
    SET_TOKEN = "SET_TOKEN",
    SET_AUTH_FAIL = "SET_AUTH_FAIL",
    SET_ADMIN_ROLE = "SET_ADMIN_ROLE",
    SET_CURRENT_MENU_ITEM = "SET_CURRENT_MENU_ITEM",
    SET_ORDER_OPENED = "SET_ORDER_OPENED"
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

type SetCurrentMenuItem = {
    type: StateChangeActionType.SET_CURRENT_MENU_ITEM;
    payload: MenuItem;
};

type SetOrderOpened = {
    type: StateChangeActionType.SET_ORDER_OPENED;
    payload: number;
};

export type StateChangeActions =
    | SetToken
    | SetAuthFail
    | SetAdminRole
    | SetCurrentMenuItem
    | SetOrderOpened;