import React, {useCallback, useEffect, useState} from "react";
import {DataTable} from "../tableForData/DataTable";
import {ordersTableScheme} from "./OrdersTableScheme";
import {getOrdersListForUser} from "../../api/orders";
import {connect} from "react-redux";
import {Order, Product} from "../../types";
import store, {AppStore} from "../../store/store";
import {AppRole} from "../../api/user";
import {StateChangeActionType} from "../../store/actions";
import {getProductsByIds} from "../../api/products";

export type OrdersTableProps = {
    roles: AppRole[]
    setSelectedOrder: (selectedOrder: Order | null) => void
    resetLastSelectedData: () => void
}
const OrdersTable = (props: OrdersTableProps): JSX.Element => {
    const {roles, setSelectedOrder, resetLastSelectedData} = props;
    const [orderList, setOrdersList] = useState<Order[]>([]);

    useEffect(() => {
        getOrdersListForUser()
            .then(async (response) => {
                const productsLists = response.orders.map(o => o.products)
                let idsList = [] as number[];
                productsLists.forEach((pl) => {
                    const tmp = pl?.map(p => Object.values(p))
                        .reduce((a, v) => [...a, ...v]) as number[]
                    idsList = [...idsList, ...tmp]
                })

                let ids = [] as number[];
                idsList.forEach((e) => ids.includes(e) ? null : ids = [...ids, e])
                const tmp: Product[] = await getProductsByIds(ids);

                const arr = response.orders.map(e => {
                    return {
                        ...e,
                        productsData: e.products?.map(id =>
                            (tmp.find((p) => p.id === id) ?? null))
                    }
                })
                setOrdersList(arr)
                console.warn(arr)

            })
            .then(resetLastSelectedData)
    }, [roles, resetLastSelectedData]);

    const rowCLickHandler = useCallback((id) => {
            setSelectedOrder(orderList.find(el => el.id === id) ?? null)
        },
        [setSelectedOrder, orderList])

    return <DataTable data={orderList} scheme={ordersTableScheme} onRowClick={rowCLickHandler}/>
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