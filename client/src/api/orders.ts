import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";
import {Order} from "../types";


export type OrdersListResponse = {
    orders: Order[]
}

export const getOrdersList = (): Promise<OrdersListResponse> => {
    return customFetch<{}, OrdersListResponse>(
        `${getUrl()}/orders/all`,
        Method.GET,
        undefined,
        true
    );
}

export const getOrdersListForUser = (): Promise<OrdersListResponse> => {
    return customFetch<{}, OrdersListResponse>(
        `${getUrl()}/orders/forUser`,
        Method.GET,
        undefined,
        true
    );
}