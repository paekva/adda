import React from "react";
import './Layout.css';
import Router from "../menu/Router";
import MenuBar from "../menu/MenuBar";
import {MenuItem} from "../../types";

const ClientMenu = [
    {menu: MenuItem.PRODUCTS, title: 'Товары'},
    {menu: MenuItem.ORDERS, title: 'Мои заказы'},
    {menu: MenuItem.BUCKET, title: 'Корзина'},
    {menu: MenuItem.PERSONAL, title: 'Личный кабинет'},
    {menu: MenuItem.NOTIFICATIONS, title: 'Уведомления'},
]

export const ClientLayout = (): JSX.Element => {

    return <div className='client'>
        <div className='inner'>
            <div className='title'>Каталог</div>
            <MenuBar styleClass='clientMenuBar' items={ClientMenu}/>
        </div>
        <Router/>
    </div>
}