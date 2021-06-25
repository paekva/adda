import {RowData, Scheme} from "../tableForData/types";
import {statusToStringMap} from "../../types";
import {AppRole} from "../../api/user";
import {getStatusForUser} from "../order/util";

export const ordersTableScheme = (roles: AppRole[]): Scheme => {
    return {
        'id': {
            label: 'Номер заказа',
            renderer: (data: RowData): JSX.Element => {
                return <div>
                    {data.isCustom ? `custom_${data.id}` : data.id}
                </div>
            }
        },
        'client': {
            label: 'Клиент'
        },
        'products': {
            label: 'Состав',
            renderer: (data: RowData): JSX.Element => {
                return <div>
                    {data.isCustom
                        ? data.description
                        : data.products?.map((el: any) => <div>{el.name} -
                            {el['quantity']} шт.</div>)}
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