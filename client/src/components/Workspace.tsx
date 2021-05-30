import React, {useEffect} from "react";
import {AppRole, getUserData} from "../api/user";
import {getAuthService} from "./auth/authService";
import ProductList from "./common/ProductList";
import {Product} from "../types/Product";
import {getProductsList} from "../api/products";
import {StateChangeActionType} from "../store/actions";
import store from "../store/store";
import {connect} from "react-redux";

type Props = {
    setUserData: (roles: AppRole[], userName: string) => void;
    setProductsData: (products: Product[]) => void;
    products: Product[];
    roles: AppRole[],
    username: string,
};

const Workspace = (props: Props): JSX.Element => {
    const {setUserData, roles, username, setProductsData, products} = props;

    useEffect(() => {
        getUserData()
            .then((response) => setUserData(response.roles, response.username))
            .catch((_) => {
                getAuthService().logout();
            });
    }, [setUserData]);

    useEffect(() => {
        getProductsList()
            .then((response) => {
                    setProductsData(response.products)
                }
            )
            .catch((e) => {
                console.error(e.toString());
            });
    }, [setProductsData]);

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        {(roles.includes(AppRole.CLIENT) || roles.includes(AppRole.ADMIN))
            ? (<ProductList products={products}/>)
            : username
        }
    </div>
}

const mapStateToProps = (store: any) => {
    return {
        roles: store.roles,
        username: store.username,
        products: store.products
    };
};

const mapDispatchToProps = () => {
    return {
        setUserData: (roles: AppRole[], userName: string) => {
            store.dispatch({
                type: StateChangeActionType.SET_ADMIN_ROLE,
                payload: {
                    roles,
                    userName,
                },
            });
        },
        setProductsData: (products: Product[]) => {
            store.dispatch({
                type: StateChangeActionType.SET_PRODUCTS_LIST,
                payload: products
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
