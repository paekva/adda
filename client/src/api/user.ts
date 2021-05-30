import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";

export enum AppRole {
    MANAGER = "MANAGER",
    CLIENT = "CLIENT",
    PURCHASER = "PURCHASER",
    LOADER = "LOADER",
    COURIER = "COURIER",
    MASTER = "MASTER"
}

type UserDataResponse = {
    username: string;
    roles: AppRole[];
};

export const getUserData = (): Promise<UserDataResponse> => {
    return customFetch<{}, UserDataResponse>(
        `${getUrl()}/user/me`,
        Method.GET,
        undefined,
        true
    );
};
