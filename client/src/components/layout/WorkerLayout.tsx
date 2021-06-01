import React from "react";
import './Layout.css';
import OrdersTable from "../orders/OrdersTable";
import {WorkerMenuBar} from "../menuBar/WorkerMenuBar";

export const WorkerLayout = (): JSX.Element => {
    return <div className='outer'>
        <div className='title'>Статус заказов</div>
        <div className='worker'>
            <WorkerMenuBar />
            <OrdersTable />
        </div>
    </div>
}