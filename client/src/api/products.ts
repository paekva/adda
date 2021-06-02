import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";
import {Product} from "../types";


export type ProductsListResponse = {
    products: Product[]
}

export const getProductsList = (): Promise<ProductsListResponse> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/products/all`,
        Method.GET,
        undefined,
        true
    );
}

export const getBucketList = (): Promise<ProductsListResponse> => {
    return customFetch<{}, ProductsListResponse>(
        `${getUrl()}/cart/cartContents`,
        Method.GET,
        undefined,
        true
    );
}

export const addProduct = (productId: number): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        // `${getUrl()}/cart/addProduct?productId=${productId}`,
        '',
        Method.POST,
        undefined,
        true
    );
}

export const makeOrder = (): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        // `${getUrl()}/cart/makeOrder`,
        '',
        Method.GET,
        undefined,
        true
    );
}
export const clearCat = (): Promise<any> => {
    return customFetch<{}, ProductsListResponse>(
        // `${getUrl()}/cart/clear`,
        '',
        Method.GET,
        undefined,
        true
    );
}