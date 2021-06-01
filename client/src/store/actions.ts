import {AppRole} from "../api/user";

export enum StateChangeActionType {
    SET_TOKEN = "SET_TOKEN",
    SET_AUTH_FAIL = "SET_AUTH_FAIL",
    SET_ADMIN_ROLE = "SET_ADMIN_ROLE",
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

export type StateChangeActions =
    | SetToken
    | SetAuthFail
    | SetAdminRole;