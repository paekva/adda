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
import {RowData} from "../tableForData/types";

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

    const rowCLickHandler = useCallback((id, isCustom) => {
            let newList = orderList.filter(x => x.isCustom === isCustom)
            setSelectedOrder(newList.find(el => el.id === id) ?? null)
        },
        [setSelectedOrder, orderList])

    const highlightRowOn = useCallback((data: RowData): boolean => {
            const admin = roles.includes(AppRole.ADMIN) && data.status.includes('ACCEPTANCE')
            const purchaser = roles.includes(AppRole.PURCHASER) && data.status.includes('BUY') && !data.status.includes('ACCEPTANCE')
            const loader = roles.includes(AppRole.LOADER) && data.status.includes('LOAD') && !data.status.includes('UNLOAD') && !data.status.includes('ACCEPTANCE')
            const master = roles.includes(AppRole.MASTER) && data.status.includes('UNLOAD') && !data.status.includes('ACCEPTANCE')
            const courier = roles.includes(AppRole.COURIER) && data.status.includes('DELIVERY') && !data.status.includes('ACCEPTANCE')
            return admin || purchaser || loader || master || courier
        },
        [roles])

    const scheme = useMemo(() => {
        return ordersTableScheme(roles)
    }, [roles])
    return <DataTable data={orderList} scheme={scheme} onRowClick={rowCLickHandler} highlightRowOn={highlightRowOn}/>
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