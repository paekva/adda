import React, {useEffect, useState} from "react";
import {Product} from "../../types";
import {clearCat, getCardList, makeOrder} from "../../api/products";
import {CardItem} from "./CardItem";
import Button from "@material-ui/core/Button";

export const Card = (): JSX.Element => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        getCardList()
            .then((response) => {
                    response && setProducts(response.products)
                }
            )
            .catch((e) => {
                console.error(e.toString());
            });
    }, []);

    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className='wrapper'>
            {
                products.length > 0 ? products.map((el) => <CardItem product={el}/>) : 'Вы еще ничего не выбрали'
            }
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", padding: 10}}>
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
                onClick={() => clearCat().then((r) => r != null ? setProducts([]) : null)}
                style={{height: 56}}
                disabled={products.length == 0}
            >
                Очистить корзину
            </Button>
        </div>
    </div>
}