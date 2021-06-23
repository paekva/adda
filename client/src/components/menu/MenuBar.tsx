import React from "react";
import './MenuBar.css'
import {MenuItem} from "../../types";
import store, {AppStore} from "../../store/store";
import {StateChangeActionType} from "../../store/actions";
import {connect} from "react-redux";

export type MenuBarProps = {
    styleClass: string,
    items: { menu: MenuItem, title: string }[]
    setMenuItem: (currentMenuItem: MenuItem) => void;
    currentMenuItem: MenuItem | null
}

const MenuBar = (props: MenuBarProps): JSX.Element => {
    return <div className={props.styleClass}>
        {props.items.map((el, index) =>
            <div key={`menu${index}`} className='menuItem'
                 style={props.currentMenuItem === el.menu ? {background: "antiquewhite"} : {}}
                 onClick={() => props.setMenuItem(el.menu)}>{el.title}</div>)}
    </div>
}


const mapStateToProps = (store: AppStore) => {
    return {
        currentMenuItem: store.currentMenuItem
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);