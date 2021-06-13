import {RowData, Scheme} from "../tableForData/types";
import {Product, statusToStringMap} from "../../types";
import {getStatusForUser} from "../order/OrderPage";
import {AppRole} from "../../api/user";

export const ordersTableScheme = (roles: AppRole[]): Scheme => {
    return {
        'id': {
            label: 'Номер заказа'
        },
        'client': {
            label: 'Клиент'
        },
        'products': {
            label: 'Состав',
            renderer: (data: RowData): JSX.Element => {
                return <div>
                    {data.isCustom ? data.description : data.products?.map((el: Product) => el.name).join(',')}
                </div>
            }
        },
        'dateOfOrder': {
            label: 'Дата заказа',
            formatter: (num: number) => new Date(num).toLocaleDateString("en-US")
        },
        'dateOfReceive': {
            label: 'Дата доставки',
            formatter: (num: number) => new Date(num).toLocaleDateString("en-US")
        },
        'status': {
            label: 'Состояние',
            formatter: (status: string) => {
                return statusToStringMap[roles.includes(AppRole.USER) ? getStatusForUser(status) : status]
            }
        },
    }
}