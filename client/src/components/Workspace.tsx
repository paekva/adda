import React, {useEffect} from "react";
import {AppRole, getUserData} from "../api/user";
import {getAuthService} from "./auth/authService";
import {StateChangeActionType} from "../store/actions";
import store from "../store/store";
import {connect} from "react-redux";
import {ClientLayout} from "./layout/ClientLayout";
import {WorkerLayout} from "./layout/WorkerLayout";

type Props = {
    setUserData: (roles: AppRole[], userName: string) => void;
    roles: AppRole[],
    username: string,
};

const Workspace = (props: Props): JSX.Element => {
    const {setUserData, roles} = props;

    useEffect(() => {
        getUserData()
            .then((response) => setUserData(response.roles, response.username))
            .catch((_) => {
                getAuthService().logout();
            });
    }, [setUserData]);

    return roles.includes(AppRole.CLIENT)
        ? (<ClientLayout/>)
        : (<WorkerLayout/>)

}

const mapStateToProps = (store: any) => {
    return {
        roles: store.roles,
        username: store.username,
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
