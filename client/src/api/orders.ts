import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";
import {Order} from "../types/Order";


export type OrdersListResponse = {
    orders: Order[]
}

export const getOrdersListByUser = (): Promise<OrdersListResponse> => {
    return customFetch<{}, OrdersListResponse>(
        `${getUrl()}/orders/all/`,
        Method.GET,
        undefined,
        true
    );
}