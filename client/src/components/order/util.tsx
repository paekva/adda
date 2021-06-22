import {Order, Status} from "../../types";
import {acceptOrder, cancelOrder, checkOrder, declineOrder, startOrder} from "../../api/orders";

export const admin: Status[] = [
    Status.ACCEPTANCE,
    Status.BUY,
    Status.LOAD,
    Status.ON_THE_WAY,
    Status.UNLOAD,
    Status.DELIVERY
]

export const client: Status[] = [
    Status.ACCEPTANCE,
    Status.USER_ONLY_PREPARE,
    Status.ON_THE_WAY,
    Status.USER_ONLY_DELIVERY
]

export const adminButton = (order?: Order | null) => [
    {
        label: "Сообщить об ошибке",
        handler: () => order?.id ? declineOrder(order.id) : null,
        disabled: order?.status ? !areActionsAvailableForAdmin(order?.status) : true
    },
    {
        label: "Подтвердить",
        handler: () => order?.id ? acceptOrder(order.id) : null,
        disabled: order?.status ? !areActionsAvailableForAdmin(order?.status) : true
    },
]

export const workerButton = (order?: Order | null) => [
    {
        label: "Взять в выполнение",
        handler: () => order?.id ? startOrder(order.id) : null,
        disabled: order?.status ? !areActionsAvailableForWorker(order?.status) : true
    },
    {
        label: "Завершить выполнение",
        handler: () => order?.id ? checkOrder(order.id) : null,
        disabled: order?.status ? !areActionsAvailableForWorker(order?.status) : true
    },
]

// export const clientButton = (order?: Order | null) => [
//     {
//         label: "Отказаться от заказа",
//         handler: () => order?.id ? cancelOrder(order.id) : null,
//         disabled: order?.status ? !isCancelAvailableForClient(order?.status) : true
//     },
//     {
//         label: "Оплатить заказ",
//         handler: () => order?.id ? console.warn('paying') : null,
//         disabled: order?.status ? !isPayAvailableForClient(order?.status) : true
//     },
// ]

const areActionsAvailableForAdmin = (status: Status) => status.toString().includes('ACCEPTANCE')
const areActionsAvailableForWorker = (status: Status) => status.toString().includes('WAIT') && !status.toString().includes('ACCEPTANCE')
const isCancelAvailableForClient = (status: Status) => status.toString().includes('DELIVERY') || status.toString().includes('PAID')
const isPayAvailableForClient = (status: Status) => !status.toString().includes('ERROR') && !status.toString().includes('PAID')