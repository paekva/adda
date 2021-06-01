import store, {AppStore} from "../../store/store";
import {StateChangeActionType} from "../../store/actions";
import {connect} from "react-redux";
import {MenuItem, Order} from "../../types";
import OrdersTable from "../orders/OrdersTable";
import ProductList from "../products/ProductList";
import React from "react";
import {Personal} from "../personal/Personal";
import OrderPage from "../order/OrderPage";

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

const mapDispatchToProps = () => {
    return {
        setMenuItem: (currentMenuItem: MenuItem) => {
            store.dispatch({
                type: StateChangeActionType.SET_CURRENT_MENU_ITEM,
                payload: currentMenuItem,
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Router);
