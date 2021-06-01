import React from "react";
import './Layout.css';
import Router from "../menuBar/Router";
import {ClientMenuBar} from "../menuBar/ClientMenuBar";

export const ClientLayout = (): JSX.Element => {

    return <div className='client'>
        <div className='inner'>
            <div className='title'>Каталог</div>
            <ClientMenuBar/>
        </div>
        <Router />
    </div>
}