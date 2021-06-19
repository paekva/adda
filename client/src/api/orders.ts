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

export const cancelOrder = (orderId: number, isCustom: boolean): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/cancel?orderId=${orderId}&isCustom=${isCustom}`,
        Method.GET,
        undefined,
        true
    );
}

export const cancelCustomOrder = (orderId: number, reason: String): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/cancelCustom?orderId=${orderId}&reason=${reason}`,
        Method.GET,
        undefined,
        true
    );
}

export const acceptCustomOrder = (orderId: number, newPrice: string): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/acceptCustom?orderId=${orderId}&newPrice=${newPrice}`,
        Method.GET,
        undefined,
        true
    );
}

export const acceptOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/accept?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    );
}

export const declineOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/decline?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    );
}

export const startOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/start?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    );
}

export const checkOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/check?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    );
}