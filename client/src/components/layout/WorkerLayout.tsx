import React from "react";
import './Layout.css';
import {MenuBar} from "../menuBar/MenuBar";
import Router from "../menuBar/Router";
import {MenuItem} from "../../types";

export const WorkerLayout = (): JSX.Element => {
    return <div className='outer'>
        <div className='title'>Статус заказов</div>
        <div className='worker'>
            <MenuBar style={'workerMenuBar'} items={[{menu: MenuItem.ORDERS, title: 'Заказы'}]} />
            <Router />
        </div>
    </div>
}