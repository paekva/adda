import React, {useEffect, useState} from "react";
import {DataTable} from "../tableForData/DataTable";
import {ordersTableScheme} from "./OrdersTableScheme";
import {getOrdersList, getOrdersListForUser} from "../../api/orders";
import {connect} from "react-redux";
import {Order} from "../../types";
import {AppStore} from "../../store/store";
import {AppRole} from "../../api/user";

export type OrdersTableProps = {
    roles: AppRole[]
}
const OrdersTable = (props: OrdersTableProps): JSX.Element => {
    const [orderList, setOrdersList] = useState<Order[]>([
        {id: 1, client: 0, dateOfOrder: 11, dateOfReceive: 22, status: 0, products: [1]}
    ]);

    useEffect(() => {
        (props.roles.includes(AppRole.ADMIN) ? getOrdersList : getOrdersListForUser)()
            .then((response) => setOrdersList(response.orders))
    }, [props.roles]);
    return <DataTable data={orderList} scheme={ordersTableScheme}/>
}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles,
    };
};

export default connect(mapStateToProps)(OrdersTable);