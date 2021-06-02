export type Product = {
    id: number;
    name: string;
    price: string;
}

export type Order = {
    id: number;
    client: number;
    dateOfOrder: number;
    dateOfReceive: number;
    status: number;
    isCustom: boolean;
    products: number[];
    description: string;
}

export enum MenuItem {
    PRODUCTS,
    ORDERS,
    SINGLE_ORDER,
    NOTIFICATIONS,
    PERSONAL,
    NEW_USER,
    SINGLE_PRODUCT,
    BUCKET
}