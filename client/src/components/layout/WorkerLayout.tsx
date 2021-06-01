import React from "react";
import './Layout.css';
import {WorkerMenuBar} from "../menuBar/WorkerMenuBar";
import Router from "../menuBar/Router";

export const WorkerLayout = (): JSX.Element => {
    return <div className='outer'>
        <div className='title'>Статус заказов</div>
        <div className='worker'>
            <WorkerMenuBar />
            <Router />
        </div>
    </div>
}