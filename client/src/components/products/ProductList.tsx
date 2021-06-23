import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import "./ProductList.css";
import {getProductsList} from "../../api/products";
import {ProductItem} from "./ProductItem";
import {Product} from "../../types";
import Button from "@material-ui/core/Button";
import {Dialog} from "../dialog/Dialog";
import {makeCustomOrder} from "../../api/orders";
import {TextField} from "@material-ui/core";
import store from "../../store/store";
import {StateChangeActionType} from "../../store/actions";
import {displayAlert} from "../../utils";

export type ProductListProps = {
    setMessage: (message: string | null) => void;
}
const ProductList = (props: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isCustomDialog, setCustomDialog] = useState<boolean>(false);
    const [customOrder, setCustomOrder] = useState<string>('');
    useEffect(() => {
        getProductsList()
            .then((response) => {
                    response && setProducts(response.products)
                }
            )
            .catch((e) => {
                console.error(e.toString());
            });
    }, []);

    const onMakeCustomOrder = useCallback(() => setCustomDialog(true), [])
    const renderBody = useCallback(() => {
        return <div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <TextField variant="outlined" onChange={(e) => setCustomOrder(e.target.value)}/>

            <div style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => makeCustomOrder(customOrder).then((resp) => {
                        setCustomDialog(false)
                        displayAlert(resp ? `Вы добавили новый заказ` : "Произошла ошибка при подтверждении заказа, попробуйте снова", props.setMessage)
                    })}
                    style={{height: 56}}
                >
                    Создать
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    onClick={() => setCustomDialog(false)}
                    style={{height: 56}}
                >
                    Отмена
                </Button>
            </div>
        </div>
    }, [customOrder])
    const renderHeader = useCallback(() => {
        return <div>
            Введите информацию о произвольном заказе в поле
        </div>
    }, [])

    return <div style={{display: 'flex', flexDirection: "column"}}>
        <Button
            type="submit"
            variant="contained"
            color="default"
            onClick={() => onMakeCustomOrder()}
            style={{height: 56}}
            disabled={products.length == 0}
        >
            Создать произвольный заказ
        </Button>
        <div className='wrapper'>
            {
                products.map((el, index) => <ProductItem sendUpdateMessage={props.setMessage} key={`product${index}`}
                                                         product={el}/>)
            }
        </div>
        {isCustomDialog &&
        <Dialog renderBody={renderBody} renderHeader={renderHeader}/>}
    </div>
}

const mapDispatchToProps = () => {
    return {
        setMessage: (message: string | null) => {
            store.dispatch({
                type: StateChangeActionType.SET_MESSAGE,
                payload: message,
            });
        },
    };
};
export default connect(null, mapDispatchToProps)(ProductList);