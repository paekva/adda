import React, {useEffect, useState} from "react";
import {DataTable} from "../tableForData/DataTable";
import {ordersTableScheme} from "./OrdersTableScheme";
import {getOrdersList, getOrdersListForUser} from "../../api/orders";
import {connect} from "react-redux";
import {Order} from "../../types";
import store, {AppStore} from "../../store/store";
import {AppRole} from "../../api/user";
import {StateChangeActionType} from "../../store/actions";

export type OrdersTableProps = {
    roles: AppRole[]
    setSelectedOrder: (selectedOrder: number) => void
}
const OrdersTable = (props: OrdersTableProps): JSX.Element => {
    const [orderList, setOrdersList] = useState<Order[]>([
        {id: 1, client: 0, dateOfOrder: 11, dateOfReceive: 22, status: 0, products: [1]}
    ]);

    useEffect(() => {
        (props.roles.includes(AppRole.ADMIN) ? getOrdersList : getOrdersListForUser)()
            .then((response) => setOrdersList(response.orders))
    }, [props.roles]);

    return <DataTable data={orderList} scheme={ordersTableScheme} onRowClick={props.setSelectedOrder}/>
}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles,
    };
};

const mapDispatchToProps = () => {
    return {
        setSelectedOrder: (selectedOrder: number) => {
            store.dispatch({
                type: StateChangeActionType.SET_ORDER_OPENED,
                payload: selectedOrder,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);