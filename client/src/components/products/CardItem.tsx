import React from "react";
import "./ProductList.css";

export type CartItemProps = {
    product: any,
    deleteCallback: (id: number) => void;
    incrementCallback: (id: number) => void;
    decrementCallback: (id: number) => void;
}

export const CardItem = (props: CartItemProps): JSX.Element => {
    const {product} = props;
    return <div className='productEl'>
        <div style={{display: "flex", flexDirection: "row"}}>
            <button style={{flex: 1}} onClick={() => props.incrementCallback(product.id)}>+</button>
            <button style={{flex: 1}} onClick={() => props.decrementCallback(product.id)}>-</button>
            <div style={{width: 10}}/>
            <button style={{flex: 3}} onClick={() => props.deleteCallback(product.id)}>delete</button>
        </div>
        <div className={'image'}> image</div>
        <div className='controls'>
            <div>
                {product.name}
                {product.price}
            </div>

            <div>
                {product.quantity}
            </div>
        </div>
    </div>
}