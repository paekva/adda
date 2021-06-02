import {AppRole} from "../../api/user";
import React from "react";
import {Order} from "../../types";
import './OrderPage.css'

export const OrderInfo = (props: { selectedOrder?: Order | null, roles: AppRole[] }): JSX.Element => {
    const {selectedOrder, roles} = props;
    return <div className='elements'>
        {selectedOrder ?
            <>
                <div>
                    {!roles.includes(AppRole.USER) && (`Клиент: ${selectedOrder.client}`)}
                </div>
                <div>
                    Дата заказа: {new Date(selectedOrder.dateOfOrder).toLocaleDateString("en-US")}
                </div>

                <div>
                    Дата доставки: {new Date(selectedOrder.dateOfReceive).toLocaleDateString("en-US")}
                </div>

                <div>
                    Состав заказа: {selectedOrder.products ?? selectedOrder.description}
                </div>

            </>
            : <div>none</div>
        }
    </div>
}