import React from "react";
import './Layout.css';
import ProductList from "../products/ProductList";
import {ClientMenuBar} from "../menuBar/ClientMenuBar";

export const ClientLayout = (): JSX.Element => {

    return <div className='client'>
        <div className='inner'>
            <div className='title'>Статус заказов</div>
            <ClientMenuBar/>
        </div>
        <ProductList/>
    </div>
}