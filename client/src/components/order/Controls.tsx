import {AppRole} from "../../api/user";
import Button from "@material-ui/core/Button";
import React, {useCallback, useState} from "react";
import {Order, Status} from "../../types";
import {
    acceptCustomOrder,
    acceptOrder,
    cancelCustomOrder,
    cancelOrder,
    checkOrder,
    declineOrder,
    startOrder
} from "../../api/orders";
import {displayAlert} from "../../utils";
import {areActionsAvailableForAdmin, areActionsAvailableForWorker} from "./util";
import {Dialog} from "../dialog/Dialog";
import {TextField} from "@material-ui/core";
import store from "../../store/store";
import {StateChangeActionType} from "../../store/actions";
import {connect} from "react-redux";

export type ControlsProps = {
    roles: AppRole[],
    selectedOrder: Order | null,
    resetOnOrderUpdate: () => void
    setMessage: (msg: string | null) => void
}
const Controls = (props: ControlsProps): JSX.Element => {
    const {roles, selectedOrder} = props;


    const [isClientCancelDialog, setClientCancelDialog] = useState<boolean>(false);
    const [isDialog, setDialog] = useState<boolean>(false);
    const [isCancelDialog, setCancelDialog] = useState<boolean>(false);

    const [orderEvaluation, setOrderEvaluation] = useState<string>('');
    const [orderCancel, setOrderCancel] = useState<string>('');


    const renderClientCancelHeader = useCallback(() => {
        return <div>
            ОТМЕНА ЗАКАЗА
        </div>
    }, [])
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

    const renderClientCancelBody = useCallback(() => {
        return <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <div>Вы уверены, что хотите отказаться от заказа?</div>
            <div style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => selectedOrder?.id ? cancelOrder(selectedOrder.id, selectedOrder.isCustom).then((resp) => {
                        setClientCancelDialog(false)
                        !resp && displayAlert("Произошла ошибка при подтверждении заказа, попробуйте снова", props.setMessage)
                        resp && props.resetOnOrderUpdate()
                    }) : null}
                    style={{height: 56}}
                >
                    Отменить заказ
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => setClientCancelDialog(false)}
                    style={{height: 56}}
                >
                    Отмена
                </Button>
            </div>
        </div>
    }, [])

    const renderBody = useCallback(() => {
        return <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <TextField variant="outlined" error={isNaN(+orderEvaluation)}
                       helperText={isNaN(+orderEvaluation) ? 'Необходимо ввести целое число для стоимости' : ' '}
                       placeholder="Введите стоимость заказа"
                       onChange={(e) => setOrderEvaluation(e.target.value)}/>

            <div style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => selectedOrder?.id && !(isNaN(+orderEvaluation))
                        ? acceptCustomOrder(selectedOrder.id, orderEvaluation)
                            .then((resp) => {
                                setDialog(false)
                                !resp && displayAlert("Произошла ошибка при подтверждении заказа, попробуйте снова", props.setMessage)
                                resp && props.resetOnOrderUpdate()
                            })
                        : null}
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
                    onClick={() => selectedOrder?.id ? cancelCustomOrder(selectedOrder.id, orderCancel).then((resp) => {
                        setCancelDialog(false)
                        !resp && displayAlert("Произошла ошибка при отмене заказа, попробуйте снова", props.setMessage)
                        resp && props.resetOnOrderUpdate()
                    }) : null}
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

    const onCancelByClient = useCallback(() => setClientCancelDialog(true), [])
    const onAcceptCustomOrder = useCallback(() => selectedOrder?.status == Status.ACCEPTANCE
        ? setDialog(true)
        : selectedOrder?.id
            ? acceptOrder(selectedOrder.id).then((resp) => {
                resp && props.resetOnOrderUpdate()
                !resp && displayAlert("Произошла ошибка при подтверждении заказа, попробуйте снова", props.setMessage)
            })
            : null,
        [])
    const onCancelCustomOrder = useCallback(() => setCancelDialog(true), [])


    const clientButton = (order?: Order | null,) => [
        {
            label: "Отказаться от заказа",
            handler: () => onCancelByClient(),
            disabled: (order?.status === Status.ACCEPTANCE || order?.status === Status.USER_ONLY_PREPARE)
        },
        {
            label: "Оплатить заказ",
            handler: () => order?.id ? console.warn('paying') : null,
            disabled: true
        },
    ]

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

    const adminButton = (order?: Order | null,) => [
        {
            label: "Сообщить об ошибке",
            handler: () => order?.id ? declineOrder(order.id).then((resp) => {
                !resp && displayAlert("Произошла ошибка при отказе от заказа, попробуйте снова", props.setMessage)
            }) : null,
            disabled: true // order?.status ? !areActionsAvailableForAdmin(order?.status) : true
        },
        {
            label: "Подтвердить",
            handler: () => order?.id ? acceptOrder(order.id).then((resp) => {
                !resp && displayAlert("Произошла ошибка при подтверждении заказа, попробуйте снова", props.setMessage)
                resp && props.resetOnOrderUpdate()
            }) : null,
            disabled: order?.status ? !areActionsAvailableForAdmin(order?.status) : true
        },
    ]

    const workerButton = (order?: Order | null,) => [
        {
            label: "Сообщить об ошибке",
            handler: () => {
                displayAlert("Произошла ошибка при отказе от заказа, попробуйте снова", props.setMessage)
            },
            disabled: true // order?.status ? !areActionsAvailableForWorker(order?.status) : true
        },
        {
            label: "Взять в выполнение",
            handler: () => order?.id ? startOrder(order.id).then((resp) => {
                !resp && displayAlert("Произошла ошибка при взятии заказа в выполнение, попробуйте снова", props.setMessage)
                resp && props.resetOnOrderUpdate()
            }) : null,
            disabled: order?.status ? !areActionsAvailableForWorker(order?.status) : true
        },
        {
            label: "Завершить выполнение",
            handler: () => order?.id ? checkOrder(order.id).then((resp) => {
                !resp && displayAlert("Произошла ошибка при завершении выполнения заказ, попробуйте снова", props.setMessage)
                resp && props.resetOnOrderUpdate()
            }) : null,
            disabled: order?.status ? !areActionsAvailableForWorker(order?.status) : true
        },
    ]

    return <>
        <div className='controlsInOrder'>
            {(roles.includes(AppRole.USER)
                ? clientButton(selectedOrder)
                : (roles.includes(AppRole.ADMIN) && selectedOrder?.isCustom == false)
                    ? adminButton(selectedOrder)
                    : (roles.includes(AppRole.ADMIN) && selectedOrder?.isCustom == true)
                        ? adminButtonForCustom()
                        : workerButton(selectedOrder))
                .map((el, index) => <Button
                    key={`btns${index}`}
                    disabled={el.disabled}
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={el.handler}
                    style={{height: 35, margin: '0px 5px'}}
                >
                    {el.label}
                </Button>)}


            {isDialog &&
            <Dialog renderBody={renderBody} renderHeader={renderHeader}/>}

            {isCancelDialog &&
            <Dialog renderBody={renderBodyCancel} renderHeader={renderHeaderCancel}/>}

            {isClientCancelDialog &&
            <Dialog renderBody={renderClientCancelBody} renderHeader={renderClientCancelHeader}/>}
        </div>
    </>
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

export default connect(null, mapDispatchToProps)(Controls)