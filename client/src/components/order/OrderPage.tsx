import React from "react";
import {connect} from "react-redux";
import {Order} from "../../types";

export type OrderPageProps = {
    selectedOrder: Order | null
}
// TODO: no data
const OrderPage = (props: OrderPageProps): JSX.Element => {
    return <div>
        {props.selectedOrder ?
            Object.keys(props.selectedOrder).map(el => <div> {el} </div>)
            : <div>none</div>
        }
    </div>
}

export default connect()(OrderPage)