import React from "react";
import "./ProductList.css";
import {Product} from "../../types";

export type ProductItemProps = {
    product: Product
}

export const ProductItem = (props: ProductItemProps): JSX.Element => {
    const {product} = props;
    return <div className='productEl'>
        <div className={'image'}> image</div>
        <div className='controls'>
            <div>
                {product.name}
                {product.price}
            </div>

            <button onClick={() => console.warn(product.id)}>+</button>
        </div>
    </div>
}