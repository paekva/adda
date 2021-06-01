export type Order = {
    id: number;
    client: number;
    products: number[],
    dateOfOrder: number;
    dateOfReceive: number;
    status: number;
}