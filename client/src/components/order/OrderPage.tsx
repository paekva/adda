import React, {useMemo} from "react";
import {Order, Status, statusToStringMap} from "../../types";
import {AppRole} from "../../api/user";
import './OrderPage.css'
import StatusPanel from "./StatusPanel";
import store, {AppStore} from "../../store/store";
import {connect} from "react-redux";
import {OrderInfo} from "./OrderInfo";
import {Confirmation} from "./Confirmation";
import {admin, checkThatOrderInActiveStateForTheUser, client, getStatusForUser} from "./util";
import {StateChangeActionType} from "../../store/actions";
import Controls from "./Controls";

export type OrderPageProps = {
    selectedOrder: Order | null
    roles: AppRole[]
    setMessage: (message: string | null) => void
    resetOnOrderUpdate: () => void
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
            <div style={{
                color:
                    currentStatus.includes('WAIT')
                        ? 'orange'
                        : currentStatus.includes('ERROR')
                        ? 'red'
                        : 'green'
            }}>{statusToStringMap[currentStatus]}</div>
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

        {selectedOrder && checkThatOrderInActiveStateForTheUser(selectedOrder?.status, props.roles) &&
        <div className='manage'>
            <div>Информация о выполнении</div>
            <Confirmation sendUpdateMessage={props.setMessage} selectedOrder={selectedOrder} roles={roles} resetOnOrderUpdate={props.resetOnOrderUpdate} />
        </div>}

        <Controls roles={props.roles}
                  selectedOrder={props.selectedOrder}/>
    </div>
}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles
    }
}
const mapDispatchToProps = () => {
    return {
        setMessage: (message: string | null) => {
            store.dispatch({
                type: StateChangeActionType.SET_MESSAGE,
                payload: message,
            });
        },

        resetOnOrderUpdate: () => {
            store.dispatch({
                type: StateChangeActionType.RETURN_TO_ORDERS_AFTER_UPDATE,
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)