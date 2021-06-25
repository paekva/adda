import {AppRole} from "../../api/user";
import React, {useEffect, useState} from "react";
import {Order, Status} from "../../types";
import './OrderPage.css'

export const OrderInfo = (props: { selectedOrder?: Order | null, roles: AppRole[] }): JSX.Element => {
    const {selectedOrder, roles} = props;
    const [products, setProducts] = useState<string[]>(['информация о заказе отсутствует'])
    const [normalOrderCost, setNormalOrderCost] = useState<string>('')
    useEffect(() => {
        if (selectedOrder && selectedOrder?.description && selectedOrder?.products?.length === 0)
            setProducts([selectedOrder?.description])
        else if (selectedOrder) {
            setProducts(selectedOrder?.products?.map(e => {
                return `${e.name}  ${e.price} - ${e.quantity} шт.`
            }) ?? ['информация о заказе отсутствует']);
        }

        if (selectedOrder && !(selectedOrder.isCustom) && selectedOrder.products) {
            const sum = selectedOrder.products.reduce((sum, current) => sum + parseInt(current.price) * current['quantity'], 0);
            setNormalOrderCost(String(sum))
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

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '15px 0'}}>
                    Состав заказа: {products.map(el => <div> {el} </div>)}
                </div>

                <div>
                    {selectedOrder.isCustom && !(selectedOrder.status === Status.RETURNED) && (`Стоимость: ${selectedOrder.price} (SLG)`)}
                </div>

                <div>
                    {(selectedOrder.status === Status.RETURNED || selectedOrder.status.includes('ERROR')) && (`Причина отказа: ${selectedOrder.lastError ?? "He известна"}`)}
                </div>

                <div>
                    {!(selectedOrder.isCustom) && (`Общая стоимость: ${normalOrderCost} SLG`)}
                </div>

            </>
            : <div>none</div>
        }
    </div>
}