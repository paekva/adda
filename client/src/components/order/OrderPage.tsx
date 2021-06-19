import React, {useCallback, useMemo, useState} from "react";
import {Dialog} from "../dialog/Dialog";
import {TextField} from "@material-ui/core";
import {Order, Status, statusToStringMap} from "../../types";
import {AppRole} from "../../api/user";
import './OrderPage.css'
import StatusPanel from "./StatusPanel";
import {AppStore} from "../../store/store";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {OrderInfo} from "./OrderInfo";
import {Confirmation} from "./Confirmation";
import {acceptCustomOrder, cancelCustomOrder} from "../../api/orders";
import {admin, adminButton, client, clientButton, workerButton} from "./util";

export type OrderPageProps = {
    selectedOrder: Order | null
    roles: AppRole[]
}

export const getStatusForUser: any = (status: Status) => {
    switch (status) {
        case Status.BUY_WAIT:
        case Status.BUY:
        case Status.BUY_ERROR:
        case Status.LOAD_WAIT:
        case Status.LOAD:
            return Status.USER_ONLY_PREPARE;
        case Status.UNLOAD_WAIT:
        case Status.UNLOAD:
        case Status.UNLOAD_ERROR:
        case Status.DELIVERY_WAIT:
        case Status.DELIVERY:
        case Status.DELIVERY_ERROR:
            return Status.USER_ONLY_DELIVERY;
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

    const [isDialog, setDialog] = useState<boolean>(false);
    const [isCancelDialog, setCancelDialog] = useState<boolean>(false);

    const [orderEvaluation, setOrderEvaluation] = useState<string>('');
    const [orderCancel, setOrderCancel] = useState<string>('');

    const onAcceptCustomOrder = useCallback(() => setDialog(true), [])
    const onCancelCustomOrder = useCallback(() => setCancelDialog(true), [])

    const renderHeader = useCallback(() => {
        return <div>
            ОЦЕНКА ЗАКАЗА
        </div>
    }, [])
    const renderHeaderCancel = useCallback(() => {
        return <div>
            ОТКЛОНЕНИЕ ЗАКАЗА
        </div>
    }, [])

    const renderBody = useCallback(() => {
        return <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <TextField variant="outlined" placeholder="Введите стоимость заказа"
                       onChange={(e) => setOrderEvaluation(e.target.value)}/>

            <div style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => selectedOrder?.id ? acceptCustomOrder(selectedOrder.id).then(() => setDialog(false)) : null}
                    style={{height: 56}}
                >
                    Принять заказ
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => setDialog(false)}
                    style={{height: 56}}
                >
                    Отмена
                </Button>
            </div>
        </div>
    }, [orderEvaluation])
    const renderBodyCancel = useCallback(() => {
        return <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <TextField variant="outlined" placeholder="Укажите причину"
                       onChange={(e) => setOrderCancel(e.target.value)}/>

            <div style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => selectedOrder?.id ? cancelCustomOrder(selectedOrder.id).then(() => setCancelDialog(false)) : null}
                    style={{height: 56}}
                >
                    Отклонить заказ
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => setCancelDialog(false)}
                    style={{height: 56}}
                >
                    Отмена
                </Button>
            </div>
        </div>
    }, [orderCancel])

    const adminButtonForCustom = () => [
        {
            label: "Подтвердить",
            handler: () => onAcceptCustomOrder(),
            disabled: false
        },
        {
            label: "Отклонить",
            handler: () => onCancelCustomOrder(),
            disabled: false
        },
    ]

    return <div className='order'>

        <div className='header'>
            <div className='orderId'>Заказ №{selectedOrder?.id}</div>
            <div style={{
                color:
                    currentStatus.includes('WAIT')
                        ? 'yellow'
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

        {!roles.includes(AppRole.USER) &&
        <div className='manage'>
            <div>Информация о выполнении</div>
            <Confirmation selectedOrder={selectedOrder} roles={roles}/>
        </div>}

        <div className='controlsInOrder'>
            {(roles.includes(AppRole.USER)
                ? clientButton
                : (roles.includes(AppRole.ADMIN) && selectedOrder?.isCustom == false)
                    ? adminButton
                    : (roles.includes(AppRole.ADMIN) && selectedOrder?.isCustom == true)
                        ? adminButtonForCustom
                        : workerButton)
            (selectedOrder)
                .map((el) => <Button
                    disabled={el.disabled}
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={el.handler}
                    style={{height: 35, margin: '0px 5px'}}
                >
                    {el.label}
                </Button>)}

        </div>

        {isDialog &&
        <Dialog renderBody={renderBody} renderHeader={renderHeader}/>}

        {isCancelDialog &&
        <Dialog renderBody={renderBodyCancel} renderHeader={renderHeaderCancel}/>}
    </div>
}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles
    }
}
export default connect(mapStateToProps)(OrderPage)