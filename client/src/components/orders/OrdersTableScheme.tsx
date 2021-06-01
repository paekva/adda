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
        label: 'Дата заказа',
        formatter: (num) => new Date(num).toLocaleDateString("en-US")
    },
    'dateOfReceive': {
        label: 'Дата доставки',
        formatter: (num) => new Date(num).toLocaleDateString("en-US")
    },
    'status': {
        label: 'Состояние'
    },
}