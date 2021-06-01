export type Product = {
    id: number;
    name: string;
    price: string;
}

export type Order = {
    id: number;
    client: number;
    products: number[],
    dateOfOrder: number;
    dateOfReceive: number;
    status: number;
}

export enum MenuItem {
    PRODUCTS,
    ORDERS,
    SINGLE_ORDER,
    NOTIFICATIONS,
    USER_PAGE,
    NEW_USER,
    SINGLE_PRODUCTб,
    BUCKET
}