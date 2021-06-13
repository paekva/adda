import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import "./ProductList.css";
import {getProductsList} from "../../api/products";
import {ProductItem} from "./ProductItem";
import {Product} from "../../types";
import Button from "@material-ui/core/Button";
import {makeCustomOrder} from "../../api/orders";

export type ProductListProps = {}
const ProductList = (props: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
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

    /// TODO: send description from the form filled up by the user
    const onMakeCustomOrder = useCallback(() => makeCustomOrder('очень много печенек'), [])

    return <div style={{display: 'flex', flexDirection: "column"}}>
        <div className='wrapper'>
            {
                products.map((el) => <ProductItem product={el}/>)
            }
        </div>
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
    </div>
}

export default connect()(ProductList);