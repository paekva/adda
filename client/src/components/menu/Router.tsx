import {AppStore} from "../../store/store";
import {connect} from "react-redux";
import {MenuItem, Order} from "../../types";
import OrdersTable from "../orders/OrdersTable";
import ProductList from "../products/ProductList";
import React from "react";
import {Personal} from "../personal/Personal";
import OrderPage from "../order/OrderPage";
import {Card} from "../products/Card";

export type RouterProps = {
    currentMenuItem: MenuItem | null
    selectedOrder: Order | null
}


export const Router = (props: RouterProps): JSX.Element => {
    switch (props.currentMenuItem) {
        case MenuItem.ORDERS:
            return <OrdersTable/>
        case MenuItem.PRODUCTS:
            return <ProductList/>
        case MenuItem.PERSONAL:
            return <Personal/>
        case MenuItem.SINGLE_ORDER:
            return <OrderPage selectedOrder={props.selectedOrder}/>
        case MenuItem.BUCKET:
            return <Card/>
        default:
            return <div>no such page yet</div>
    }
}

const mapStateToProps = (store: AppStore) => {
    return {
        currentMenuItem: store.currentMenuItem,
        selectedOrder: store.lastSelectedOrder
    };
};

export default connect(mapStateToProps)(Router);
