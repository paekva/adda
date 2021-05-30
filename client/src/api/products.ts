import {customFetch} from "./customFetch";
import {getUrl} from "./url";
import {Method} from "./types";
import {Product} from "../types/Product";


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