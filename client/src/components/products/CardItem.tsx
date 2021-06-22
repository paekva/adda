import React from "react";
import "./ProductList.css";
import {getImageUrl} from "../../api/products";
import {IconButton} from "@material-ui/core";
import {Add, Delete, Remove} from "@material-ui/icons";

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
    return <div className='productEl'>
        <div style={{display: "flex", flexDirection: "row"}}>

            <IconButton
                type="submit"
                color="default"
                onClick={() => props.incrementCallback(product.id)}
                style={{height: 40, width: 40}}
            >
                <Add/>
            </IconButton>


            <IconButton
                type="submit"
                color="default"
                onClick={() => props.decrementCallback(product.id)}
                style={{height: 40, width: 40}}
            >
                <Remove/>
            </IconButton>

            <div style={{flex: 1}}/>

            <IconButton
                type="submit"
                color="default"
                onClick={() => props.deleteCallback(product.id)}
                style={{height: 40, width: 40}}
            >
                <Delete/>
            </IconButton>
        </div>
        <div className='image'>{image} </div>
        <div className='controls'>
            <div>
                {product.name}
                {product.price}
            </div>

            <div style={{fontSize: 20, color: 'red', fontStyle: 'bold', padding: 5}}>
                {product.quantity}
            </div>
        </div>
    </div>
}