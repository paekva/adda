import {RowData, Scheme} from "../tableForData/types";
import {Product} from "../../types";

export const ordersTableScheme: Scheme = {
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