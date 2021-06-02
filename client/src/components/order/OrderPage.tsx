import React from "react";
import {getStatusByCode, Order, Status, statusToStringMap} from "../../types";
import {AppRole} from "../../api/user";
import './OrderPage.css'
import StatusPanel from "./StatusPanel";
import {AppStore} from "../../store/store";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

const admin: Status[] = [
    Status.ACCEPTANCE,
    Status.BUY,
    Status.LOAD,
    Status.ON_THE_WAY,
    Status.UNLOAD,
    Status.DELIVERY
]

const client: Status[] = [
    Status.ACCEPTANCE,
    Status.PREPARE,
    Status.ON_THE_WAY,
    Status.DELIVERY
]

const adminButton = [
    {
        label: "Сообщить об ошибке",
        handler: () => {
        },
        disabled: false
    },
    {
        label: "Подтвердить",
        handler: () => {
        },
        disabled: false
    },
]

const clientButton = [
    {
        label: "Отказаться от заказа",
        handler: () => {
        },
        disabled: false
    },
    {
        label: "Оплатить заказ",
        handler: () => {
        },
        disabled: false
    },
]
export type OrderPageProps = {
    selectedOrder: Order | null
    roles: AppRole[]
}
const OrderPage = (props: OrderPageProps): JSX.Element => {
    const {selectedOrder, roles} = props;
    return <div className='order'>
        <div className='header'>
            <div className='orderId'>Заказ №{selectedOrder?.id}</div>
            <div
                className='statusText'>{selectedOrder?.status !== null && selectedOrder?.status !== undefined
                ? statusToStringMap[getStatusByCode(selectedOrder?.status)]
                : 'Not available'}</div>
        </div>
        {(roles.includes(AppRole.USER) || roles.includes(AppRole.ADMIN))
        && <StatusPanel statusList={roles.includes(AppRole.USER) ? client : admin} current={Status.ACCEPTANCE}/>}
        <div className='info'>
            <div>Информация о заказе</div>
            <div className='elements'>
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
        </div>
        {!roles.includes(AppRole.USER) && <div className='manage'>Data</div>}
        <div className='controlsInOrder'>
            {(roles.includes(AppRole.USER) ? clientButton : adminButton)
                .map((el) => <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={el.handler}
                    style={{height: 35, margin: '0px 5px'}}
                >
                    {el.label}
                </Button>)}
        </div>

    </div>
}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles
    }
}
export default connect(mapStateToProps)(OrderPage)