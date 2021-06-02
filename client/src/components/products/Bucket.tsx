import React, {useEffect, useState} from "react";
import {Product} from "../../types";
import {getBucketList} from "../../api/products";
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
        <Button
            type="submit"
            variant="contained"
            color="default"
            onClick={() => console.warn('оформлено')}
            style={{height: 56}}
        >
            Оформить заказ
        </Button>
    </div>
}