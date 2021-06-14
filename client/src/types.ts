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
    status: Status;
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
    ACCEPTANCE = 'ACCEPTANCE',
    BUY = 'BUY',
    LOAD = 'LOAD',
    UNLOAD = 'UNLOAD',
    DELIVERY = 'DELIVERY',
    PREPARE = 'PREPARE',
    ON_THE_WAY = 'ON_THE_WAY',
    CANCELED = 'CANCELED',
    UNKNOWN = 'UNKNOWN'
}

export const statusToStringMap: { [key: string]: string } = {
    [Status.ACCEPTANCE.toString()]: 'Подтверждение заказа',
    [Status.BUY.toString()]: 'Закупка',
    [Status.LOAD.toString()]: 'Загрузка',
    [Status.PREPARE.toString()]: 'Сбор заказа',
    [Status.ON_THE_WAY.toString()]: 'В пути',
    [Status.UNLOAD.toString()]: 'Выгрузка',
    [Status.DELIVERY.toString()]: 'Доставка',
    [Status.CANCELED.toString()]: 'Заказ отменен',
    [Status.UNKNOWN.toString()]: 'Статус заказа не известен',
}

export const userRoleToOrderStatusMap = {
    [AppRole.COURIER.toString()]: Status.DELIVERY,
    [AppRole.LOADER.toString()]: Status.LOAD,
    [AppRole.MASTER.toString()]: Status.UNLOAD,
    [AppRole.PURCHASER.toString()]: Status.BUY,
}