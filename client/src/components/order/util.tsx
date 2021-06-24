import {Status} from "../../types";
import {AppRole} from "../../api/user";

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

export const areActionsAvailableForAdmin = (status: Status) => status.toString().includes('ACCEPTANCE')
export const areActionsAvailableForWorker = (status: Status) => status.toString().includes('WAIT') && !status.toString().includes('ACCEPTANCE')

export const checkThatOrderInActiveStateForTheUser = (status: Status, roles: AppRole[]): boolean => {
    const admin = roles.includes(AppRole.ADMIN) && status.includes('ACCEPTANCE')
    const purchaser = roles.includes(AppRole.PURCHASER) && status.includes('BUY') && !status.includes('ACCEPTANCE')
    const loader = roles.includes(AppRole.LOADER) && status.includes('LOAD') && !status.includes('UNLOAD') && !status.includes('ACCEPTANCE')
    const master = roles.includes(AppRole.MASTER) && status.includes('UNLOAD') && !status.includes('ACCEPTANCE')
    const courier = roles.includes(AppRole.COURIER) && status.includes('DELIVERY') && !status.includes('ACCEPTANCE')
    return admin || purchaser || loader || master || courier
}

export const getStatusForUser: any = (status: Status) => {
    switch (status) {
        case Status.BUY_WAIT:
        case Status.BUY:
        case Status.BUY_ERROR:
        case Status.BUY_WAIT_ACCEPTANCE:
        case Status.LOAD_WAIT:
        case Status.LOAD:
        case Status.LOAD_ERROR:
            return Status.USER_ONLY_PREPARE;
        case Status.UNLOAD_WAIT:
        case Status.UNLOAD:
        case Status.UNLOAD_ERROR:
        case Status.UNLOAD_WAIT_ACCEPTANCE:
        case Status.DELIVERY_WAIT:
        case Status.DELIVERY:
        case Status.DELIVERY_ERROR:
        case Status.DELIVERY_WAIT_ACCEPTANCE:
            return Status.USER_ONLY_DELIVERY;
        default:
            return status;

    }
}