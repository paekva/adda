import store, {AppStore} from "../../store/store";
import {connect} from "react-redux";
import {MenuItem, Order} from "../../types";
import OrdersTable from "../orders/OrdersTable";
import ProductList from "../products/ProductList";
import React from "react";
import {Personal} from "../personal/Personal";
import OrderPage from "../order/OrderPage";
import {Card} from "../products/Card";
import {AppRole} from "../../api/user";
import {StateChangeActionType} from "../../store/actions";

export type RouterProps = {
    currentMenuItem: MenuItem | null
    selectedOrder: Order | null
    roles: AppRole[]
    setMessage: (message: string | null) => void
}


export const Router = (props: RouterProps): JSX.Element => {
    switch (props.currentMenuItem) {
        case MenuItem.ORDERS:
            return <OrdersTable/>
        case MenuItem.PRODUCTS:
            return <ProductList/>
        case MenuItem.PERSONAL:
            return <Personal roles={props.roles}/>
        case MenuItem.SINGLE_ORDER:
            return <OrderPage selectedOrder={props.selectedOrder}/>
        case MenuItem.BUCKET:
            return <Card setMessage={props.setMessage}/>
        default:
            return <div>no such page yet</div>
    }
}

const mapStateToProps = (store: AppStore) => {
    return {
        currentMenuItem: store.currentMenuItem,
        selectedOrder: store.lastSelectedOrder,
        roles: store.roles
    };
};

const mapDispatchToProps = () => {
    return {
        setMessage: (message: string | null) => {
            store.dispatch({
                type: StateChangeActionType.SET_MESSAGE,
                payload: message,
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Router);
