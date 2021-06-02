import React, {useEffect, useState} from "react";
import {Product} from "../../types";
import {getBucketList} from "../../api/products";
import {BucketItem} from "./BucketItem";

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

    return <div className='wrapper'>
        {
            products.map((el) => <BucketItem product={el}/>)
        }
    </div>
}