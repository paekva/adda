import React from "react";
import './MenuBar.css'
import {MenuItem} from "../../types";
import store from "../../store/store";
import {StateChangeActionType} from "../../store/actions";
import {connect} from "react-redux";

export type MenuBarProps = {
    style: string,
    items: { menu: MenuItem, title: string }[]
    setMenuItem: (currentMenuItem: MenuItem) => void;
}

const MenuBar = (props: MenuBarProps): JSX.Element => {
    return <div className={props.style}>
        {props.items.map((el) =>
            <div className='menuItem' onClick={() => props.setMenuItem(el.menu)}>{el.title}</div>)}
    </div>
}


const mapDispatchToProps = () => {
    return {
        setMenuItem: (currentMenuItem: MenuItem) => {
            store.dispatch({
                type: StateChangeActionType.SET_CURRENT_MENU_ITEM,
                payload: currentMenuItem,
            });
        },
    };
};

export default connect(null, mapDispatchToProps)(MenuBar);