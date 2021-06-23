import React, {useCallback, useEffect, useState} from "react";
import {getProductsList} from "../../api/products";
import {CardItem} from "./CardItem";
import Button from "@material-ui/core/Button";
import {addProduct, clearCat, deleteProductFromCard, getCardList, makeOrder, removeOneProduct} from "../../api/cart";
import {displayAlert} from "../../utils";

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
        deleteProductFromCard(id).then((resp) => {
            updateCart()

            displayAlert(resp ? `Вы удалили товар "${name}" из корзины`
                : "Произошла ошибка при удалении товара из корзины, попробуйте снова", props.setMessage
            )
        });
    }, [products])

    const onIncrement = useCallback((id: number) => {
        addProduct(id).then((resp) => {
            updateCart()

            resp && displayAlert("Произошла ошибка при добавлении товара, попробуйте снова", props.setMessage)
        });
    }, [])

    const onDecrement = useCallback((id: number) => {
        removeOneProduct(id).then((resp) => {
            updateCart()
            resp && displayAlert("Произошла ошибка при уменьшении числа товаров, попробуйте снова", props.setMessage)
        });
    }, [])

    const onClear = useCallback(() => {
        clearCat().then((resp) => {
            updateCart()

            displayAlert(resp ? `Вы очистили корзину`
                : "Произошла ошибка при очищении корзины, попробуйте снова", props.setMessage
            )
        });
    }, [])

    const onMakeOrder = useCallback(() => {
        makeOrder().then((resp) => {
            updateCart()

            displayAlert(resp ? `Вы добавили новый заказ`
                : "Произошла ошибка при cоздании заказа, попробуйте снова", props.setMessage
            )
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