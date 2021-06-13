import React from "react";
import "./ProductList.css";

export type CartItemProps = {
    product: any,
    deleteCallback: (id: number) => void;
}

export const CardItem = (props: CartItemProps): JSX.Element => {
    const {product} = props;
    return <div className='productEl'>
        <button onClick={() => props.deleteCallback(product.id)}>delete</button>
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