import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import "./ProductList.css";
import {getProductsList} from "../../api/products";
import {ProductItem} from "./ProductItem";
import {Product} from "../../types";

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

    return <div className='wrapper'>
        {
            products.map((el) => <ProductItem product={el}/>)
        }
    </div>
}

export default connect()(ProductList);