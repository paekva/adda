import {AppRole} from "./api/user";

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
    products?: any[];
    description?: string;
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

export enum Status {
    ACCEPTANCE,
    BUY,
    LOAD,
    UNLOAD,
    DELIVERY,
    PREPARE,
    ON_THE_WAY,
    UNKNOWN
}

export const statusToStringMap: { [key: string]: string } = {
    [Status.ACCEPTANCE.toString()]: 'Подтверждение заказа',
    [Status.BUY.toString()]: 'Закупка',
    [Status.LOAD.toString()]: 'Загрузка',
    [Status.PREPARE.toString()]: 'Сбор заказа',
    [Status.ON_THE_WAY.toString()]: 'В пути',
    [Status.UNLOAD.toString()]: 'Выгрузка',
    [Status.DELIVERY.toString()]: 'Доставка',
}

export const getStatusByCode = (code: number):Status => {
    switch (code) {
        case 0:
            return Status.ACCEPTANCE;
        case 1:
            return Status.BUY;
        case 2:
            return Status.LOAD;
        case 3:
            return Status.PREPARE;
        case 4:
            return Status.ON_THE_WAY;
        case 5:
            return Status.UNLOAD;
        case 6:
            return Status.DELIVERY;
        default:
            return Status.UNKNOWN
    }
}

export const userRoleToOrderStatusMap = {
    [AppRole.COURIER.toString()]: Status.DELIVERY,
    [AppRole.LOADER.toString()]: Status.LOAD,
    [AppRole.MASTER.toString()]: Status.UNLOAD,
    [AppRole.PURCHASER.toString()]: Status.BUY,
}