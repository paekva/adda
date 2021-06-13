import React from "react";
import "./ProductList.css";
import {deleteProductFromCard} from "../../api/products";

export type BucketItemProps = {
    product: any
}

export const CardItem = (props: BucketItemProps): JSX.Element => {
    const {product} = props;
    return <div className='productEl'>
        <button onClick={() => deleteProductFromCard(product.id)}>delete</button>
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