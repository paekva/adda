import React from "react";
import './Layout.css';
import Router from "../menu/Router";
import MenuBar from "../menu/MenuBar";
import {MenuItem} from "../../types";


export const ClientLayout = (): JSX.Element => {

    return <div className='client'>
        <div className='inner'>
            <div className='title'>Каталог</div>
            <MenuBar style={'clientMenuBar'} items={[{menu: MenuItem.ORDERS, title: 'Мои заказы'}]} />
        </div>
        <Router />
    </div>
}