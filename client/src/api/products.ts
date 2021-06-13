import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";
import {Product} from "../types";


export type ProductsListResponse = {
    products: Product[]
}

export const getProductsList = (): Promise<ProductsListResponse | null> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/products/all`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('getProductsList not working');
        return null;
    });
}

export const getProductsByIds = (ids: number[]): Promise<any> => {
    return customFetch<{}, any>(
        `${getUrl()}/products/byIds`,
        Method.POST,
        ids,
        true
    ).catch((e) => {
        console.error('getProductsByIds not working');
        return null;
    });

}

export const getCardList = (): Promise<ProductsListResponse | null> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/cart/cartContents`,
        Method.GET,
        undefined,
        true
    ).catch((e) => {
        console.error('getBucketList not working');
        return null;
    });

}

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

export const makeOrder = (): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        // `${getUrl()}/cart/makeOrder`,
        '',
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