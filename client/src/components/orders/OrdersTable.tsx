import React, {useEffect, useState} from "react";
import {DataTable} from "../tableForData/DataTable";
import {ordersTableScheme} from "./OrdersTableScheme";
import {Order} from "../../types/Order";
import {getOrdersListByUser} from "../../api/orders";
import {connect} from "react-redux";

export type OrdersTableProps = {}
const OrdersTable = (props: OrdersTableProps): JSX.Element => {
    const [orderList, setOrdersList] = useState<Order[]>([
        {id: 1, client: 0, dateOfOrder: 11, dateOfReceive: 22, status: 0, products: [1]}
    ]);

    useEffect(() => {
        getOrdersListByUser().then((response) => setOrdersList(response.orders))
    }, []);
    return <DataTable data={orderList} scheme={ordersTableScheme}/>
}

export default connect()(OrdersTable);