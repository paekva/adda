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


