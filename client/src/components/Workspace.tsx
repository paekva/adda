import React, {useEffect} from "react";
import {connect} from "react-redux";
import {AppRole, getUserData} from "../api/user";
import store from "../store/store";
import {StateChangeActionType} from "../store/actions";
import {getAuthService} from "./auth/authService";

type Props = {
    setUserData: (roles: AppRole[], userName: string) => void;
    roles: AppRole[],
    username: string,
};

const Workspace = (props: Props): JSX.Element => {
    const {setUserData, roles, username} = props;

    useEffect(() => {
        getUserData()
            .then((response) => setUserData(response.roles, response.username))
            .catch((_) => {
                getAuthService().logout();
            });
    }, [setUserData]);

    return <div>Success {roles} {username}</div>
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
