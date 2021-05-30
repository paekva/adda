import {getToken} from "../../api/auth";
import store from "../../store/store";
import {StateChangeActionType} from "../../store/actions";

export const tokenStorageName = "token";
export const lastMenuItem = "lastMenuItem";

class AuthServiceClass {
    constructor() {
        this.getUserTokenFromStorage();
    }

    public login = (username: string, password: string): void => {
        getToken(`grant_type=password&username=${username}&password=${password}`);
    };

    public logout = (): void => {
        this.cleanUserSpecificInfo().then((_) => {
            this.removeUserToken();
            this.updateTokenValueInStore(null);
        });
    };

    public setUserToken = (token: string): void => {
        this.setUserTokenToStorage(token);
        this.updateTokenValueInStore(token);
    };

    public setAuthError = (error: string): void => {
        store.dispatch({
            type: StateChangeActionType.SET_AUTH_FAIL,
            payload: error,
        });
    };

    public getToken = (): string => store.getState().userToken || "";

    private removeUserToken = (): void => {
        localStorage.removeItem(tokenStorageName);

        store.dispatch({
            type: StateChangeActionType.SET_TOKEN,
            payload: null,
        });
    };

    private cleanUserSpecificInfo = async (): Promise<void> => {
        await localStorage.removeItem(lastMenuItem);
    };

    private getUserTokenFromStorage = (): void => {
        const token = localStorage.getItem(tokenStorageName);
        if (token && token !== "undefined") this.updateTokenValueInStore(token);
    };

    private setUserTokenToStorage = (token: string): void => {
        localStorage.setItem(tokenStorageName, token);
    };

    private updateTokenValueInStore = (token: string | null): void => {
        store.dispatch({
            type: StateChangeActionType.SET_TOKEN,
            payload: token,
        });
    };
}

const authServiceClassInstance: AuthServiceClass = new AuthServiceClass();

export const getAuthService = () => {
    return authServiceClassInstance;
};
