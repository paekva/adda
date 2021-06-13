import React, {useMemo} from "react";
import {Order, Status, statusToStringMap, userRoleToOrderStatusMap} from "../../types";
import {AppRole} from "../../api/user";
import './OrderPage.css'
import StatusPanel from "./StatusPanel";
import {AppStore} from "../../store/store";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {OrderInfo} from "./OrderInfo";
import {Confirmation} from "./Confirmation";

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

const adminButton = (order?: Order | null) => [
    {
        label: "Сообщить об ошибке",
        handler: () => order?.id ? console.warn('rejecting') : null,
        disabled: false
    },
    {
        label: "Подтвердить",
        handler: () => order?.id ? console.warn('accepting') : null,
        disabled: false
    },
]

const clientButton = (order?: Order | null) => [
    {
        label: "Отказаться от заказа",
        handler: () => order?.id ? console.warn('rejecting') : null,
        disabled: (order?.status === Status.ACCEPTANCE || order?.status === Status.PREPARE)
    },
    {
        label: "Оплатить заказ",
        handler: () => order?.id ? console.warn('paying') : null,
        disabled: false
    },
]

export type OrderPageProps = {
    selectedOrder: Order | null
    roles: AppRole[]
}

export const getStatusForUser: any = (status: Status) => {
    switch (status) {
        case Status.BUY:
        case Status.LOAD:
            return Status.PREPARE;
        case Status.UNLOAD:
            return Status.DELIVERY;
        default:
            return status;

    }
}

const OrderPage = (props: OrderPageProps): JSX.Element => {
    const {selectedOrder, roles} = props;
    const currentStatus = useMemo(() => {
        return props.selectedOrder?.status != null
            ? roles.includes(AppRole.USER) ? getStatusForUser(props.selectedOrder?.status) : props.selectedOrder?.status
            : Status.UNKNOWN
    }, [props.selectedOrder?.status])
    return <div className='order'>

        <div className='header'>
            <div className='orderId'>Заказ №{selectedOrder?.id}</div>
            <div
                className='statusText'>{statusToStringMap[currentStatus]}</div>
        </div>

        {(roles.includes(AppRole.USER) || roles.includes(AppRole.ADMIN))
        && <StatusPanel
            statusList={roles.includes(AppRole.USER) ? client : admin}
            current={currentStatus}
        />}

        <div className='info'>
            <div>Информация о заказе</div>
            <OrderInfo selectedOrder={selectedOrder} roles={roles}/>
        </div>

        {!(roles.includes(AppRole.USER) || (!roles.includes(AppRole.ADMIN) && selectedOrder?.status !== userRoleToOrderStatusMap[roles[0]])) &&
        <div className='manage'>
            <div>Информация о выполнении</div>
            <Confirmation selectedOrder={selectedOrder} roles={roles}/>
        </div>}

        <div className='controlsInOrder'>
            {(roles.includes(AppRole.USER) ? clientButton : adminButton)(selectedOrder)
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