import {Scheme} from "../tableForData/types";

export const ordersTableScheme: Scheme = {
    'id': {
        label: 'Номер заказа'
    },
    'client': {
        label: 'Клиент'
    },
    'products': {
        label: 'Состав'
    },
    'dateOfOrder': {
        label: 'Дата заказа'
    },
    'dateOfReceive': {
        label: 'Дата доставки'
    },
    'status': {
        label: 'Состояние'
    },
}