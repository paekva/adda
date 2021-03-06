import React, {useEffect} from "react";
import {AppRole, getUserData} from "../api/user";
import {getAuthService} from "./auth/authService";
import {StateChangeActionType} from "../store/actions";
import store, {AppStore} from "../store/store";
import {connect} from "react-redux";
import {ClientLayout} from "./layout/ClientLayout";
import {WorkerLayout} from "./layout/WorkerLayout";
import {MenuItem} from "../types";
import {Dialog} from "./dialog/Dialog";
import {Close} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type Props = {
    setUserData: (roles: AppRole[], userName: string) => void;
    setMenuItem: (currentMenuItem: MenuItem) => void;
    roles: AppRole[],
    username: string | null,
    currentMenuItem: MenuItem | null;
    message: string | null
    setMessage: (msg: string | null) => void
};

const Workspace = (props: Props): JSX.Element => {
    const {setUserData, roles, setMenuItem, currentMenuItem} = props;

    useEffect(() => {
        getUserData()
            .then((response) => {
                setUserData(response.roles, response.username);
                if (response.roles.includes(AppRole.USER))
                    setMenuItem(MenuItem.PRODUCTS);
                else setMenuItem(MenuItem.ORDERS);
            })
            .catch((_) => {
                getAuthService().logout();
            });
    }, [setUserData, setMenuItem]);

    return <div>
        {currentMenuItem == null
            ? <div>Wait for it...</div>
            : roles.includes(AppRole.USER)
                ? (<ClientLayout/>)
                : (<WorkerLayout roles={roles}/>)}

        {props.message && <Dialog
            coords={{bottom: 10, right: 10}}
            hideOverlay={true}
            renderHeader={() => <div
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>Сообщение</div>
                <IconButton
                    type="submit"
                    color="default"
                    onClick={() => props.setMessage(null)}
                    style={{height: 40, width: 40}}
                >
                    <Close/>
                </IconButton></div>}
            renderBody={() => <div> {props.message} </div>}/>}
    </div>

}

const mapStateToProps = (store: AppStore) => {
    return {
        roles: store.roles,
        username: store.username,
        currentMenuItem: store.currentMenuItem,
        message: store.message
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
        setMenuItem: (currentMenuItem: MenuItem) => {
            store.dispatch({
                type: StateChangeActionType.SET_CURRENT_MENU_ITEM,
                payload: currentMenuItem,
            });
        },
        setMessage: (msg: string | null) => {
            store.dispatch({
                type: StateChangeActionType.SET_MESSAGE,
                payload: msg,
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
