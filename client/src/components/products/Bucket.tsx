import React, {useEffect, useState} from "react";
import {Product} from "../../types";
import {clearCat, getBucketList, makeOrder} from "../../api/products";
import {BucketItem} from "./BucketItem";
import Button from "@material-ui/core/Button";

export const Bucket = (): JSX.Element => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        getBucketList()
            .then((response) => {
                    setProducts(response.products)
                }
            )
            .catch((e) => {
                console.error(e.toString());
            });
    }, []);

    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className='wrapper'>
            {
                products.map((el) => <BucketItem product={el}/>)
            }
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent:"space-between", padding: 10}}>
            <Button
                type="submit"
                variant="contained"
                color="default"
                onClick={() => makeOrder()}
                style={{height: 56}}
            >
                Оформить заказ
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="default"
                onClick={() => clearCat()}
                style={{height: 56}}
            >
                Очистить корзину
            </Button>
        </div>
    </div>
}