import React from "react";
import "./ProductList.css";
import {Product} from "../../types";
import {addProduct} from "../../api/cart";
import {getImageUrl} from "../../api/products";

export type ProductItemProps = {
    product: Product
}

export const ProductItem = (props: ProductItemProps): JSX.Element => {
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
    return <div className='productEl'>
        <div className={'image'}>{image} </div>
        <div className='controls'>
            <div>
                {product.name}
                {product.price}
            </div>

            <button onClick={() => addProduct(product.id)}>+</button>
        </div>
    </div>
}