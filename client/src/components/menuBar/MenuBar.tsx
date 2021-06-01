import React from "react";
import './MenuBar.css'
import {MenuItem} from "../../types";

export const MenuBar = (props: {style: string, items: { menu: MenuItem, title: string }[]}): JSX.Element => {
    return <div className={props.style}>
        {props.items.map((el) =>
            <div className='menuItem' onClick={() => console.warn(el.menu)}>{el.title}</div>)}
    </div>
}