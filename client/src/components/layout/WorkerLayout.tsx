import React from "react";
import './Layout.css';
import MenuBar from "../menu/MenuBar";
import Router from "../menu/Router";
import {MenuItem} from "../../types";
import {AppRole} from "../../api/user";


const AdminMenu = [
    {menu: MenuItem.NEW_USER, title: 'Добавление пользователя'},
    {menu: MenuItem.PRODUCTS, title: 'Обновление каталог'},
]

const WorkerMenu = [
    {menu: MenuItem.ORDERS, title: 'Статус заказов'},
    {menu: MenuItem.USER_PAGE, title: 'Личный кабинет'},
    {menu: MenuItem.NOTIFICATIONS, title: 'Уведомления'},
]

export const WorkerLayout = (props: { roles: AppRole[] }): JSX.Element => {
    return <div className='outer'>
        <div className='title'>Статус заказов</div>
        <div className='worker'>
            <MenuBar style={'workerMenuBar'}
                     items={props.roles.includes(AppRole.ADMIN) ? [...AdminMenu, ...WorkerMenu] : [...WorkerMenu]}/>
            <Router/>
        </div>
    </div>
}