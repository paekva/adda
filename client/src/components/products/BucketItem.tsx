import React from "react";
import "./ProductList.css";
import {Product} from "../../types";

export type BucketItemProps = {
    product: Product
}

export const BucketItem = (props: BucketItemProps): JSX.Element => {
    const {product} = props;
    return <div className='productEl'>
        <button onClick={() => console.warn(product.id)}>delete</button>
        <div className={'image'}> image</div>
        <div className='controls'>
            <div>
                {product.name}
                {product.price}
            </div>

            <div>
                number
            </div>
        </div>
    </div>
}