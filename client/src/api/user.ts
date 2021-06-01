import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";

export enum AppRole {
    ADMIN = "ADMIN",
    USER = "USER",
    PURCHASER = "PURCHASER",
    LOADER = "LOADER",
    COURIER = "COURIER",
    MASTER = "MASTER"
}

type UserDataResponse = {
    username: string;
    roles: AppRole[];
    id: number;
};

export const getUserData = (): Promise<UserDataResponse> => {
    return customFetch<{}, UserDataResponse>(
        `${getUrl()}/user/me`,
        Method.GET,
        undefined,
        true
    );
};
