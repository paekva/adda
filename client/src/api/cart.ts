import {customFetch} from "./customFetch";
import {Method} from "./types";
import {getUrl} from "./url";
import {ProductsListResponse} from "./products";

export const addProduct = (productId: number): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/cart/addProduct?productId=${productId}`,
        Method.POST,
        undefined,
        true
    ).catch((e) => {
        console.error('addProduct not working');
        return null;
    });
}

export const getCardList = (): Promise<any | null> => {
    return customFetch<{}, any>(
        `${getUrl()}/cart/cartContents`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('getBucketList not working');
        return null;
    });

}

export const deleteProductFromCard = (productId: number): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/cart/deleteProduct?productId=${productId}`,
        Method.POST,
        undefined,
        true
    ).catch((e) => {
        console.error('deleteProductFromCard not working');
        return null;
    });
}


export const removeOneProduct = (productId: number): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/cart/removeOneProduct?productId=${productId}`,
        Method.POST,
        undefined,
        true
    ).catch((e) => {
        console.error('removeOneProduct not working');
        return null;
    });
}

export const makeOrder = (): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/cart/makeOrder`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('makeOrder not working');
        return null;
    });
}

export const clearCat = (): Promise<ProductsListResponse | null> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/cart/clear`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('clearCat not working');
        return null;
    });

}