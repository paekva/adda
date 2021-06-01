import React from "react";
import {Product} from "../../types/Product";
import {connect} from "react-redux";
import "./ProductList.css";
import {useEffect, useState} from "react";
import {getProductsList} from "../../api/products";
import {ProductItem} from "./ProductItem";

export type ProductListProps = {}
const ProductList = (props: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        getProductsList()
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
            products.map((el) => <ProductItem product={el}/>)
        }
    </div>
}

export default connect()(ProductList);