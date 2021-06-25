import React, {useCallback, useEffect, useMemo, useState} from "react";
import {DataTable} from "../tableForData/DataTable";
import {ordersTableScheme} from "./OrdersTableScheme";
import {getOrdersListForUser, planeIsOnMoon} from "../../api/orders";
import {connect} from "react-redux";
import {Order, Status} from "../../types";
import store, {AppStore} from "../../store/store";
import {AppRole} from "../../api/user";
import {StateChangeActionType} from "../../store/actions";
import {getProductsList} from "../../api/products";
import {RowData} from "../tableForData/types";
import {checkThatOrderInActiveStateForTheUser} from "../order/util";
import {displayAlert} from "../../utils";
import Button from "@material-ui/core/Button";

export type OrdersTableProps = {
    roles: AppRole[]
    setSelectedOrder: (selectedOrder: Order | null) => void
    resetLastSelectedData: () => void
    setMessage: (message: string | null) => void
}

const OrdersTable = (props: OrdersTableProps): JSX.Element => {
    const {roles, setSelectedOrder, resetLastSelectedData} = props;
    const [orderList, setOrdersList] = useState<Order[]>([]);
    let timer: number;

    const updateTableData = useCallback(() => {
        Promise
            .all([getProductsList(), getOrdersListForUser()])
            .then((response) => {
                if (response[1] != null) {
                    const orders = [] as any[];
                    response[1].orders.forEach((el: any, index: number) => {
                        orders[index] = {
                            ...el,
                            products: el.products.map((pr: any) => {
                                return {
                                    ...pr,
                                    ...(response[0]?.products.find((e) => e.id == pr.productId) ?? {})
                                }
                            })
                        }
                    });
                    setOrdersList(orders);
                } else {
                    displayAlert("Произошла ошибка при получении заказов, попробуйте снова", props.setMessage)
                }
            })
            .catch((e) => {
                console.error(e.toString());
            })
            .then(resetLastSelectedData)
    }, [])

    // polling table data every 10 sec
    const updateOnTimeOut = useCallback(() => {
        updateTableData();
        timer = window.setTimeout(updateOnTimeOut, 5000)
    }, [])

    useEffect(() => {
        updateOnTimeOut()
        return () => window.clearTimeout(timer)
    }, [roles, resetLastSelectedData]);

    const rowCLickHandler = useCallback((id, isCustom) => {
            let newList = orderList.filter(x => x.isCustom === isCustom)
            setSelectedOrder(newList.find(el => el.id === id) ?? null)
        },
        [setSelectedOrder, orderList])

    const scheme = useMemo(() => {
        return ordersTableScheme(roles)
    }, [roles])
    return <div style={{display: 'flex', flexDirection: 'column', flex: '1 1'}}>
        {roles.includes(AppRole.ADMIN)
        && <Button
            type="submit"
            variant="contained"
            color="default"
            onClick={() => planeIsOnMoon()}
            style={{height: 56, width: 200, margin: '0 0 10px 0'}}
            disabled={!orderList.map(el => el.status).includes(Status.ON_THE_WAY)}
        >
            Товары на луне
        </Button>}

        <DataTable data={orderList} scheme={scheme} onRowClick={rowCLickHandler}
                   highlightRowOn={(data: RowData) => checkThatOrderInActiveStateForTheUser(data.status, roles)}/>
    </div>
}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles,
    };
};

const mapDispatchToProps = () => {
    return {
        setSelectedOrder: (selectedOrder: Order | null) => {
            store.dispatch({
                type: StateChangeActionType.SET_ORDER_OPENED,
                payload: selectedOrder,
            });
        },
        resetLastSelectedData: () => {
            store.dispatch({
                type: StateChangeActionType.RESET_LAST_SELECTED_DATA,
            });
        },
        setMessage: (message: string | null) => {
            store.dispatch({
                type: StateChangeActionType.SET_MESSAGE,
                payload: message,
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);