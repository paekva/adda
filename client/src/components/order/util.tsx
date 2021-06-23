import {Order, Status} from "../../types";
import {acceptOrder, checkOrder, declineOrder, startOrder} from "../../api/orders";
import {AppRole} from "../../api/user";
import {displayAlert} from "../../utils";

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

export const adminButton = (sendMessage: (msg: string | null) => void, order?: Order | null,) => [
    {
        label: "Сообщить об ошибке",
        handler: () => order?.id ? declineOrder(order.id).then((resp) => {
            resp && displayAlert("Произошла ошибка при отказе от заказа, попробуйте снова", sendMessage)
        }) : null,
        disabled: order?.status ? !areActionsAvailableForAdmin(order?.status) : true
    },
    {
        label: "Подтвердить",
        handler: () => order?.id ? acceptOrder(order.id).then((resp) => {
            resp && displayAlert("Произошла ошибка при подтверждении заказа, попробуйте снова", sendMessage)
        }) : null,
        disabled: order?.status ? !areActionsAvailableForAdmin(order?.status) : true
    },
]

export const workerButton = (sendMessage: (msg: string | null) => void, order?: Order | null,) => [
    {
        label: "Взять в выполнение",
        handler: () => order?.id ? startOrder(order.id).then((resp) => {
            resp && displayAlert("Произошла ошибка при взятии заказа в выполнение, попробуйте снова", sendMessage)
        }) : null,
        disabled: order?.status ? !areActionsAvailableForWorker(order?.status) : true
    },
    {
        label: "Завершить выполнение",
        handler: () => order?.id ? checkOrder(order.id).then((resp) => {
            resp && displayAlert("Произошла ошибка при завершении выполнения заказ, попробуйте снова", sendMessage)
        }) : null,
        disabled: order?.status ? !areActionsAvailableForWorker(order?.status) : true
    },
]

const areActionsAvailableForAdmin = (status: Status) => status.toString().includes('ACCEPTANCE')
const areActionsAvailableForWorker = (status: Status) => status.toString().includes('WAIT') && !status.toString().includes('ACCEPTANCE')
const isCancelAvailableForClient = (status: Status) => status.toString().includes('DELIVERY') || status.toString().includes('PAID')
const isPayAvailableForClient = (status: Status) => !status.toString().includes('ERROR') && !status.toString().includes('PAID')


export const checkThatOrderInActiveStateForTheUser = (status: Status, roles: AppRole[]): boolean => {
    const admin = roles.includes(AppRole.ADMIN) && status.includes('ACCEPTANCE')
    const purchaser = roles.includes(AppRole.PURCHASER) && status.includes('BUY') && !status.includes('ACCEPTANCE')
    const loader = roles.includes(AppRole.LOADER) && status.includes('LOAD') && !status.includes('UNLOAD') && !status.includes('ACCEPTANCE')
    const master = roles.includes(AppRole.MASTER) && status.includes('UNLOAD') && !status.includes('ACCEPTANCE')
    const courier = roles.includes(AppRole.COURIER) && status.includes('DELIVERY') && !status.includes('ACCEPTANCE')
    return admin || purchaser || loader || master || courier
}