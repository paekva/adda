import {customFetch, customFetchForImages} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";
import {Order, Status} from "../types";


export type OrdersListResponse = {
    orders: Order[]
}

export const getOrdersListForUser = (): Promise<OrdersListResponse | null> => {
    return customFetch<{}, OrdersListResponse>(
        `${getUrl()}/orders/forUser`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('getOrdersListForUser not working');
        return null;
    });
}

export const makeCustomOrder = (description: string): Promise<OrdersListResponse | null> => {
    return customFetch<{}, OrdersListResponse>(
        `${getUrl()}/orders/createCustom`,
        Method.POST,
        description,
        true
    ).catch((e) => {
        console.error('makeCustomOrder not working');
        return null;
    });
}

export const cancelOrder = (orderId: number, isCustom: boolean): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/cancel?orderId=${orderId}&isCustom=${isCustom}`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('cancelOrder not working');
        return null;
    });
}

export const cancelCustomOrder = (orderId: number, reason: String): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/cancelCustom?orderId=${orderId}&reason=${reason}`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('cancelCustomOrder not working');
        return null;
    });
}

export const acceptCustomOrder = (orderId: number, newPrice: string): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/acceptCustom?orderId=${orderId}&newPrice=${newPrice}`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('acceptCustomOrder not working');
        return null;
    });
}

export const acceptWork = (orderId: number) => acceptOrder(orderId)

export const acceptOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/accept?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('acceptOrder not working');
        return null;
    });
}

export const declineOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/decline?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('declineOrder not working');
        return null;
    });
}

export const startOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/start?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('startOrder not working');
        return null;
    });
}

export const checkOrder = (orderId: number): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/check?orderId=${orderId}`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('checkOrder not working');
        return null;
    });
}

export const getConfirmation = (orderId: number, status: Status): string =>
    `${getUrl()}/orders/confirmation/get?orderId=${orderId}&status=${status}`

export const setConfirmation = (
    orderId: number,
    status: Status,
    body: any
): Promise<any | null> => {
    return customFetchForImages<{}, any | null>(
        `${getUrl()}/orders/confirmation/set/${orderId}/${status}`,
        Method.POST,
        body
    ).catch((e) => {
        console.error('setConfirmation not working');
        return null;
    });
};
