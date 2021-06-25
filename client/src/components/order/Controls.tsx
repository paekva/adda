import {AppRole} from "../../api/user";
import Button from "@material-ui/core/Button";
import React, {useCallback, useState} from "react";
import {Order, Status} from "../../types";
import {
    acceptCustomOrder,
    acceptWork,
    cancelOrder,
    checkOrder,
    declineCustomOrder,
    declineWork,
    startOrder
} from "../../api/orders";
import {displayAlert} from "../../utils";
import {Dialog} from "../dialog/Dialog";
import {TextField} from "@material-ui/core";
import store from "../../store/store";
import {StateChangeActionType} from "../../store/actions";
import {connect} from "react-redux";
import {checkThatOrderInActiveStateForTheUser, getStatusForUser} from "./util";

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
    const [isDeclineDialog, setDeclineDialog] = useState<boolean>(false);
    const [isErrorDialog, setErrorDialog] = useState<boolean>(false);

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
    const renderHeaderDecline = useCallback(() => {
        return <div>
            ОТКЛОНЕНИЕ ЗАКАЗА
        </div>
    }, [])
    const renderHeaderError = useCallback(() => {
        return <div>
            СООБЩИТЬ ОБ ОШИБКЕ
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
                    onClick={() => selectedOrder?.id
                        ? cancelOrder(selectedOrder.id, selectedOrder.isCustom)
                            .then((resp) => {
                                setClientCancelDialog(false);
                                afterUpdate(resp, "Произошла ошибка при подтверждении заказа, попробуйте снова");
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
                        ? acceptCustomOrder(selectedOrder.id, selectedOrder.isCustom, orderEvaluation)
                            .then((resp) => {
                                setDialog(false)
                                afterUpdate(resp, "Произошла ошибка при подтверждении заказа, попробуйте снова")
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

    const renderBodyDecline = useCallback(() => {
        return <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <TextField variant="outlined" placeholder="Укажите причину"
                       onChange={(e) => setOrderCancel(e.target.value)}/>

            <div style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => selectedOrder?.id ? declineCustomOrder(selectedOrder.id, selectedOrder.isCustom, orderCancel)
                            .then((resp) => {
                                setDeclineDialog(false)
                                afterUpdate(resp, "Произошла ошибка при отмене заказа, попробуйте снова")
                            })
                        : null}
                    style={{height: 56}}
                >
                    Отклонить заказ
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => setDeclineDialog(false)}
                    style={{height: 56}}
                >
                    Отмена
                </Button>
            </div>
        </div>
    }, [orderCancel])

    const renderBodyError = useCallback(() => {
        return <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <TextField variant="outlined" placeholder="Укажите проблему"
                       onChange={(e) => setOrderCancel(e.target.value)}/>

            <div style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => selectedOrder?.id ? declineWork(selectedOrder.id, selectedOrder.isCustom, orderCancel)
                            .then((resp) => {
                                setErrorDialog(false)
                                afterUpdate(resp, "Произошла ошибка при отмене заказа, попробуйте снова")
                            })
                        : null}
                    style={{height: 56}}
                >
                    Отклонить заказ
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => setErrorDialog(false)}
                    style={{height: 56}}
                >
                    Отмена
                </Button>
            </div>
        </div>
    }, [orderCancel])

    const onError = useCallback(() => setErrorDialog(true), [])
    const onCancelByClient = useCallback(() => setClientCancelDialog(true), [])
    const onAcceptUserOrder = useCallback(() => setDialog(true), [])
    const onDeclineUserOrder = useCallback(() => setDeclineDialog(true), [])

    const onAcceptWork = useCallback(() => selectedOrder?.id
        ? acceptWork(selectedOrder.id, selectedOrder.isCustom).then((resp) => {
            resp && props.resetOnOrderUpdate()
            !resp && displayAlert("Произошла ошибка при подтверждении заказа, попробуйте снова", props.setMessage)
        })
        : null,
        [])

    const afterUpdate = useCallback((resp: any, message: string) => {
        !resp && displayAlert(message, props.setMessage)
        resp && props.resetOnOrderUpdate()
    }, [props.setMessage]);

    const clientButton = () => [
        {
            label: "Отказаться от заказа",
            handler: () => onCancelByClient(),
            disabled: getStatusForUser(selectedOrder?.status) !== Status.USER_ONLY_PREPARE && getStatusForUser(selectedOrder?.status) !== Status.ACCEPTANCE
        },
        {
            label: "Оплатить заказ",
            handler: () => selectedOrder?.id ? console.warn('paying') : null,
            // TODO: unblock when payment is available
            disabled: true
            // disabled: getStatusForUser(selectedOrder?.status) !== Status.USER_ONLY_PREPARE && getStatusForUser(selectedOrder?.status) !== Status.ACCEPTANCE
        },
    ]

    const adminButtonForWorkAcceptance = () => [
        {
            label: "Подтвердить",
            handler: () => onAcceptWork(),
            disabled: !selectedOrder?.status.toString().includes('ACCEPTANCE')
        },
        {
            label: "Сообщить об ошибке",
            handler: () => onError(),
            // disabled: !selectedOrder?.status.toString().includes('ACCEPTANCE')
        },
    ]

    const adminButtonForOrderAcceptance = () => [
        {
            label: "Подтвердить",
            handler: () => onAcceptUserOrder(),
            disabled: !selectedOrder?.status.toString().includes('ACCEPTANCE')
        },
        {
            label: "Отклонить",
            handler: () => onDeclineUserOrder(),
            disabled: !selectedOrder?.status.toString().includes('ACCEPTANCE')
        },
    ]

    const workerButton = (order?: Order | null,) => [
        {
            label: "Взять в выполнение",
            handler: () => order?.id
                ? startOrder(order.id, order.isCustom)
                    .then((r) => afterUpdate(r, "Произошла ошибка при взятии заказа в выполнение, попробуйте снова"))
                : null,
            disabled: selectedOrder?.status ? !(checkThatOrderInActiveStateForTheUser(selectedOrder?.status, roles)
                && selectedOrder?.status.toString().includes('WAIT')) : true
        },
        {
            label: "Завершить выполнение",
            handler: () => order?.id
                ? checkOrder(order.id, order.isCustom)
                    .then((r) => afterUpdate(r, "Произошла ошибка при завершении выполнения заказ, попробуйте снова"))
                : null,
            disabled: selectedOrder?.status ? !(checkThatOrderInActiveStateForTheUser(selectedOrder?.status, roles)
                && !(selectedOrder?.status.toString().includes('WAIT'))) : true
        },
        {
            label: "Сообщить об ошибке",
            handler: () => onError(),
            disabled: selectedOrder?.status ? !checkThatOrderInActiveStateForTheUser(selectedOrder?.status, roles) : true
        },
    ]

    return <>
        <div className='controlsInOrder'>
            {(roles.includes(AppRole.USER)
                ? clientButton()
                : (roles.includes(AppRole.ADMIN) && selectedOrder?.status === Status.ACCEPTANCE)
                    ? adminButtonForOrderAcceptance()
                    : roles.includes(AppRole.ADMIN)
                        ? adminButtonForWorkAcceptance()
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

            {isDeclineDialog &&
            <Dialog renderBody={renderBodyDecline} renderHeader={renderHeaderDecline}/>}

            {isClientCancelDialog &&
            <Dialog renderBody={renderClientCancelBody} renderHeader={renderClientCancelHeader}/>}

            {isErrorDialog &&
            <Dialog renderBody={renderBodyError} renderHeader={renderHeaderError}/>}
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