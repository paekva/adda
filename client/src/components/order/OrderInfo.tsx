import {AppRole} from "../../api/user";
import React, {useEffect, useState} from "react";
import {Order, Status} from "../../types";
import './OrderPage.css'

export const OrderInfo = (props: { selectedOrder?: Order | null, roles: AppRole[] }): JSX.Element => {
    const {selectedOrder, roles} = props;
    const [products, setProducts] = useState<string>('информация о заказе отсутствует')
    useEffect(() => {
        if (selectedOrder && selectedOrder?.description && selectedOrder?.products?.length == 0)
            setProducts(selectedOrder?.description)
        else if (selectedOrder) {
            const makeDescription = selectedOrder?.products?.map(e => {
                return `${e.name}  ${e.price}`
            }).join(",  ");
            if (makeDescription) setProducts(makeDescription);
        }
    }, [])
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
                    Состав заказа: {products}
                </div>

                <div>
                    {selectedOrder.isCustom && !(selectedOrder.status === Status.RETURNED) && (`Стоимость: ${selectedOrder.price}`)}
                </div>

                <div>
                    {selectedOrder.isCustom && selectedOrder.status === Status.RETURNED && (`Причина отказа: ${selectedOrder.price}`)}
                </div>

            </>
            : <div>none</div>
        }
    </div>
}