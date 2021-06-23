import React, {useCallback, useEffect, useState} from "react";
import {getProductsList} from "../../api/products";
import {CardItem} from "./CardItem";
import Button from "@material-ui/core/Button";
import {addProduct, clearCat, deleteProductFromCard, getCardList, makeOrder, removeOneProduct} from "../../api/cart";

export const Card = (props: { setMessage: (message: string | null) => void }): JSX.Element => {
    const [products, setProducts] = useState<any[]>([]);

    const updateCart = useCallback(() => {
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
    }, [])

    useEffect(() => {
        updateCart();
    }, []);

    const onDelete = useCallback((id: number) => {
        const name = products.find(el => el.id === id).name
        deleteProductFromCard(id).then(() => {
            updateCart()

            props.setMessage(`Вы удалили товар "${name}" из корзины`)
            setTimeout(() => props.setMessage(null), 5000)
        });
    }, [products])

    const onIncrement = useCallback((id: number) => {
        addProduct(id).then(() => updateCart());
    }, [])

    const onDecrement = useCallback((id: number) => {
        removeOneProduct(id).then(() => updateCart());
    }, [])

    const onClear = useCallback(() => {
        clearCat().then(() => updateCart());
    }, [])

    const onMakeOrder = useCallback(() => {
        makeOrder().then(() => {
            updateCart()
            props.setMessage(`Вы добавили новый заказ`)
            setTimeout(() => props.setMessage(null), 5000)
        });
    }, [])

    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className='wrapper'>
            {
                products.length > 0
                    ? products.map((el, index) => <CardItem key={`card${index}`} product={el} deleteCallback={onDelete}
                                                            incrementCallback={onIncrement}
                                                            decrementCallback={onDecrement}/>)
                    : 'Вы еще ничего не выбрали'
            }
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", padding: 10}}>
            <Button
                type="submit"
                variant="contained"
                color="default"
                onClick={() => onMakeOrder()}
                style={{height: 56}}
                disabled={products.length == 0}
            >
                Оформить заказ
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="default"
                onClick={() => onClear()}
                style={{height: 56}}
                disabled={products.length == 0}
            >
                Очистить корзину
            </Button>
        </div>
    </div>
}