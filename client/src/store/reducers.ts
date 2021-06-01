import {StateChangeActions, StateChangeActionType} from "./actions";
import {AppStore, initialState} from "./store";

function rootReducer(
    state: AppStore = initialState,
    action: StateChangeActions
): any {
    switch (action.type) {
        case StateChangeActionType.SET_TOKEN: {
            return {
                ...state,
                userToken: action.payload,
            };
        }
        case StateChangeActionType.SET_AUTH_FAIL: {
            return {
                ...state,
                authFailMessage: action.payload,
            };
        }
        case StateChangeActionType.SET_ADMIN_ROLE: {
            return {
                ...state,
                roles: action.payload.roles,
                username: action.payload.userName,
            };
        }
        case StateChangeActionType.SET_CURRENT_MENU_ITEM: {
            return {
                ...state,
                currentMenuItem: action.payload
            };
        }
    }
    return state;
}

export default rootReducer;
