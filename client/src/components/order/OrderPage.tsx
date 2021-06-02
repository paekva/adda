import React from "react";
import {connect} from "react-redux";
import {Order} from "../../types";
import {AppStore} from "../../store/store";
import {AppRole} from "../../api/user";
import './OrderPage.css'

export type OrderPageProps = {
    selectedOrder: Order | null
    roles: AppRole[]
}
const OrderPage = (props: OrderPageProps): JSX.Element => {
    const {selectedOrder, roles} = props;
    return <div className='order'>
        <div className='header'>
            <div className='orderId'>Заказ №{selectedOrder?.id}</div>
            <div className='statusText'>{selectedOrder?.status}</div>
        </div>
        <div className='status'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
        </div>
        <div className='info'>{selectedOrder ?
            Object.values(selectedOrder).map(el => <div> {el} </div>)
            : <div>none</div>
        }</div>
        {!roles.includes(AppRole.USER) && <div className='manage'></div>}
        <div className='controls'>
            <button>click</button>
        </div>

    </div>
}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles
    }
}
export default connect(mapStateToProps)(OrderPage)