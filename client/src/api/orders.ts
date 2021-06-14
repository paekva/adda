import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";
import {Order} from "../types";


export type OrdersListResponse = {
    orders: Order[]
}

export const getOrdersListForUser = (): Promise<OrdersListResponse> => {
    return customFetch<{}, OrdersListResponse>(
        `${getUrl()}/orders/forUser`,
        Method.GET,
        undefined,
        true
    );
}

export const makeCustomOrder = (description: string): Promise<OrdersListResponse> => {
    return customFetch<{}, OrdersListResponse>(
        `${getUrl()}/orders/createCustom`,
        Method.POST,
        description,
        true
    );
}

export const cancelOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/cancel?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    );
}
