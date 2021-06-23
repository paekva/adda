import {customFetch, customFetchForImages} from "./customFetch";
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
    ).catch(() => {
        console.error('getProductsList not working');
        return null;
    });
}

export const getImageUrl = (photoId: number): string => `${getUrl()}/products/image/get/${photoId}`;

export const uploadImage = (
    productId: number,
    body: any
): Promise<any | null> => {
    return customFetchForImages<{}, any | null>(
        `${getUrl()}/products/image/set/${productId}`,
        Method.POST,
        body
    );
};
