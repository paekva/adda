import React from "react";
import "./Dialog.css";

export const Dialog = (props: {
    renderHeader: () => JSX.Element,
    renderBody: () => JSX.Element,
    hideOverlay?: boolean,
    coords?: { top?: number, bottom?: number, left?: number, right?: number }
}): JSX.Element => {
    return <>
        {!props.hideOverlay && <div className='dialogOverlay'/>}
        {<div style={props.coords ? {
            top: props.coords.top,
            left: props.coords.left,
            bottom: props.coords.bottom,
            right: props.coords.right,
        } : {top: '20%'}} className='dialogBody'>
            {props.renderHeader()}
            {props.renderBody()}
        </div>}
    </>
}