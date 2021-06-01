import React from "react";
import './Layout.css';
import MenuBar from "../menu/MenuBar";
import Router from "../menu/Router";
import {MenuItem} from "../../types";
import {AppRole} from "../../api/user";


const AdminMenu = [
    {menu: MenuItem.ORDERS, title: 'Заказы'},
    {menu: MenuItem.PRODUCTS, title: 'Редактировать каталог'},
]

const WorkerMenu = [
    {menu: MenuItem.ORDERS, title: 'Заказы'},
]

export const WorkerLayout = (props: {roles: AppRole[]}): JSX.Element => {
    return <div className='outer'>
        <div className='title'>Статус заказов</div>
        <div className='worker'>
            <MenuBar style={'workerMenuBar'} items={props.roles.includes(AppRole.ADMIN) ? AdminMenu : WorkerMenu} />
            <Router />
        </div>
    </div>
}