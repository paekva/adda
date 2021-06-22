import React from "react";
import "./ProductList.css";
import {getImageUrl} from "../../api/products";

export type CartItemProps = {
    product: any,
    deleteCallback: (id: number) => void;
    incrementCallback: (id: number) => void;
    decrementCallback: (id: number) => void;
}

export const CardItem = (props: CartItemProps): JSX.Element => {
    const {product} = props;

    let image = <div className="photo">Фото не задано {product.name}</div>;
    if (product.imageId != null) {
        const url = getImageUrl(product.imageId) + "?dummy=" + new Date();
        image = <img src={url} alt="some pic" style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain'
        }}/>;
    }
    return <div className=' productEl'>
        <div style={{display: "flex", flexDirection: "row"}}>
            <button style={{flex: 1}} onClick={() => props.incrementCallback(product.id)}>+</button>
            <button style={{flex: 1}} onClick={() => props.decrementCallback(product.id)}>-</button>
            <div style={{width: 10}}/>
            <button style={{flex: 3}} onClick={() => props.deleteCallback(product.id)}>delete</button>
        </div>
        <div className=' image'>{image} </div>
        <div className=' controls'>
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