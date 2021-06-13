import React, {useCallback, useEffect, useMemo, useState} from "react";
import {DataTable} from "../tableForData/DataTable";
import {ordersTableScheme} from "./OrdersTableScheme";
import {getOrdersListForUser} from "../../api/orders";
import {connect} from "react-redux";
import {Order} from "../../types";
import store, {AppStore} from "../../store/store";
import {AppRole} from "../../api/user";
import {StateChangeActionType} from "../../store/actions";
import {getProductsList} from "../../api/products";

export type OrdersTableProps = {
    roles: AppRole[]
    setSelectedOrder: (selectedOrder: Order | null) => void
    resetLastSelectedData: () => void
}

const OrdersTable = (props: OrdersTableProps): JSX.Element => {
    const {roles, setSelectedOrder, resetLastSelectedData} = props;
    const [orderList, setOrdersList] = useState<Order[]>([]);

    useEffect(() => {
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
                }
            })
            .catch((e) => {
                console.error(e.toString());
            })
            .then(resetLastSelectedData)
    }, [roles, resetLastSelectedData]);

    const rowCLickHandler = useCallback((id) => {
            setSelectedOrder(orderList.find(el => el.id === id) ?? null)
        },
        [setSelectedOrder, orderList])

    const scheme = useMemo(() => {
        return ordersTableScheme(roles)
    }, [roles])
    return <DataTable data={orderList} scheme={scheme} onRowClick={rowCLickHandler}/>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);