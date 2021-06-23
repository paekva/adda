import React from "react";
import "./ProductList.css";
import {Product} from "../../types";
import {addProduct} from "../../api/cart";
import {getImageUrl} from "../../api/products";
import {IconButton} from "@material-ui/core";
import {Add} from "@material-ui/icons";

export type ProductItemProps = {
    product: Product
    sendUpdateMessage: (message: string | null) => void
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
        <div className='image'>{image} </div>
        <div className='controls'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                {product.name}
                {product.price}
            </div>

            <IconButton
                type="submit"
                color="default"
                onClick={() => addProduct(product.id).then(() => {
                    props.sendUpdateMessage(`Вы добавили "${product.name}" в корзину`)
                    setTimeout(() => props.sendUpdateMessage(null), 5000)
                })}
                style={{height: 56, width: 56}}
            >
                <Add/>
            </IconButton>
        </div>
    </div>
}