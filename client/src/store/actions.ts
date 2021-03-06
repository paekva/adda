import {AppRole} from "../api/user";
import {MenuItem, Order} from "../types";

export enum StateChangeActionType {
    SET_TOKEN = "SET_TOKEN",
    SET_AUTH_FAIL = "SET_AUTH_FAIL",
    SET_ADMIN_ROLE = "SET_ADMIN_ROLE",
    SET_CURRENT_MENU_ITEM = "SET_CURRENT_MENU_ITEM",
    SET_ORDER_OPENED = "SET_ORDER_OPENED",
    RESET_LAST_SELECTED_DATA = "RESET_LAST_SELECTED_DATA",
    SET_MESSAGE = 'SET_MESSAGE',
    RETURN_TO_ORDERS_AFTER_UPDATE = 'RETURN_TO_ORDERS_AFTER_UPDATE'
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
    payload: Order | null;
};

type ResetLastSelectedData = {
    type: StateChangeActionType.RESET_LAST_SELECTED_DATA;
};

type SetMessage = {
    type: StateChangeActionType.SET_MESSAGE;
    payload: string | null
};


type ReturnToOrdersAfterUpdate = {
    type: StateChangeActionType.RETURN_TO_ORDERS_AFTER_UPDATE;
};

export type StateChangeActions =
    | SetToken
    | SetAuthFail
    | SetAdminRole
    | SetCurrentMenuItem
    | SetOrderOpened
    | ResetLastSelectedData
    | SetMessage
    | ReturnToOrdersAfterUpdate;