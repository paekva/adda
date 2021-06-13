import React, {useEffect, useState} from "react";
import {clearCat, getCardList, getProductsList, makeOrder} from "../../api/products";
import {CardItem} from "./CardItem";
import Button from "@material-ui/core/Button";

export const Card = (): JSX.Element => {
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        Promise.all([getProductsList(), getCardList()])
            .then((response) => {
                if (response[1] != null) {
                    const products = [] as any[];
                    response[1].products.forEach((el: any, index: number) => {
                        products[index] = {
                            ...el,
                            ...(response[0]?.products.find((e) => e.id == el.productId) ?? {})
                        }
                    });
                    setProducts(products);
                }
            })
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
                disabled={products.length == 0}
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