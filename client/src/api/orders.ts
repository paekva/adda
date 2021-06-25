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
    ).catch(() => {
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
    ).catch(() => {
        console.error('makeCustomOrder not working');
        return null;
    });
}

// USER
// cancel order
export const cancelOrder = (orderId: number, isCustom: boolean): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders//user/cancel/order?orderId=${orderId}&isCustom=${isCustom}`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('cancelOrder not working');
        return null;
    });
}


// ADMIN
// custom order confirmation
export const acceptCustomOrder = (orderId: number, isCustom: boolean, newPrice: string): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/acceptCustom?orderId=${orderId}&isCustom=${isCustom}&newPrice=${newPrice}`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('acceptCustomOrder not working');
        return null;
    });
}

export const declineCustomOrder = (orderId: number, isCustom: boolean, reason: String): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/declineCustom?orderId=${orderId}&isCustom=${isCustom}&reason=${reason}`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('cancelCustomOrder not working');
        return null;
    });
}

// work confirmation
export const acceptWork = (orderId: number, isCustom: boolean): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/acceptWork?orderId=${orderId}&isCustom=${isCustom}`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('acceptOrder not working');
        return null;
    });
}
export const declineWork = (orderId: number, isCustom: boolean, reason: String): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/declineWork?orderId=${orderId}&isCustom=${isCustom}&reason=${reason}`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('cancelCustomOrder not working');
        return null;
    });
}

// WORKER
export const startOrder = (orderId: number, isCustom: boolean): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/start?orderId=${orderId}&isCustom=${isCustom}`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('startOrder not working');
        return null;
    });
}

export const checkOrder = (orderId: number, isCustom: boolean): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/check?orderId=${orderId}&isCustom=${isCustom}`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('checkOrder not working');
        return null;
    });
}

export const planeIsOnMoon = (): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/orders/planeIsOnMoon`,
        Method.GET,
        undefined,
        true
    ).catch(() => {
        console.error('planeIsOnMoon not working');
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
    ).catch(() => {
        console.error('setConfirmation not working');
        return null;
    });
};
