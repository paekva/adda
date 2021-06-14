import {AppRole} from "./api/user";

export type Product = {
    id: number;
    name: string;
    price: string;
    imageId: number
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
    ACCEPTANCE = "ACCEPTANCE",
    RETURNED = "RETURNED",
    BUY_WAIT = "BUY_WAIT",
    BUY = "BUY",
    BUY_WAIT_ACCEPTANCE = "BUY_WAIT_ACCEPTANCE",
    BUY_ERROR = "BUY_ERROR",
    LOAD_WAIT = "LOAD_WAIT",
    LOAD = "LOAD",
    ON_THE_WAY = "ON_THE_WAY",
    UNLOAD_WAIT = "UNLOAD_WAIT",
    UNLOAD = "UNLOAD",
    UNLOAD_WAIT_ACCEPTANCE = "UNLOAD_WAIT_ACCEPTANCE",
    UNLOAD_ERROR = "UNLOAD_ERROR",
    DELIVERY_WAIT = "DELIVERY_WAIT",
    DELIVERY = "DELIVERY",
    DELIVERY_WAIT_ACCEPTANCE = "DELIVERY_WAIT_ACCEPTANCE",
    DELIVERY_ERROR = "DELIVERY_ERROR",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED",
    PAID = "PAID",
    UNKNOWN = "UNKNOWN",

    USER_ONLY_PREPARE = "USER_ONLY_PREPARE",
    USER_ONLY_DELIVERY = "USER_ONLY_DELIVERY",
}

export const statusToStringMap: { [key: string]: string } = {
    [Status.ACCEPTANCE.toString()]: "На подтверждении",
    [Status.RETURNED.toString()]: "Заказ откланен",
    [Status.BUY_WAIT.toString()]: "Ожидание закупки",
    [Status.BUY.toString()]: "Закупка",
    [Status.BUY_WAIT_ACCEPTANCE.toString()]: "Ожидание подтверждения закупки",
    [Status.BUY_ERROR.toString()]: "Ошибка закупки",
    [Status.LOAD_WAIT.toString()]: "Ожидание загрузки",
    [Status.LOAD.toString()]: "Загрузка",
    [Status.ON_THE_WAY.toString()]: "В пути",
    [Status.UNLOAD_WAIT.toString()]: "Ожидание выгрузки",
    [Status.UNLOAD.toString()]: "Выгрузка",
    [Status.UNLOAD_WAIT_ACCEPTANCE.toString()]: "Ожидание подтверждения выгрузки",
    [Status.UNLOAD_ERROR.toString()]: "Ошибка выгрузки",
    [Status.DELIVERY_WAIT.toString()]: "Ожидание доставки",
    [Status.DELIVERY.toString()]: "Доставка",
    [Status.DELIVERY_WAIT_ACCEPTANCE.toString()]: "Ожидание подтверждения доставки",
    [Status.DELIVERY_ERROR.toString()]: "Ошибка доставки",
    [Status.DELIVERED.toString()]: "Доставлено",
    [Status.CANCELED.toString()]: "Отмена заказа",
    [Status.PAID.toString()]: "Заказ оплачен",
    [Status.UNKNOWN.toString()]: "Статус неизвестен",
}

export const userRoleToOrderStatusMap = {
    [AppRole.COURIER.toString()]: Status.DELIVERY,
    [AppRole.LOADER.toString()]: Status.LOAD,
    [AppRole.MASTER.toString()]: Status.UNLOAD,
    [AppRole.PURCHASER.toString()]: Status.BUY,
}