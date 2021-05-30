import React, {useCallback, useState} from "react";
import "./SignIn.css";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {getAuthService} from "./authService";
import {SimpleField, FormWrapper, someDataNotProvided} from "../inputs/SimpleField";

const authService = getAuthService();

const authError = "Ошибка авторизации: ";

const SignIn = (props: {
    authFailMessage: string | null;
}): JSX.Element => {
    const {authFailMessage} = props;
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onNameChange = useCallback((value) => {
        setName(value);
        setShowErrorMessage(false);
    }, []);
    const onPasswordChange = useCallback((value) => {
        setPassword(value);
        setShowErrorMessage(false);
    }, []);

    const onSignIn = useCallback(() => {
        if (name === null || password === null)
            setShowErrorMessage(true);
        else authService.login(name, password);
    }, [name, password]);

    const onEnterPress = useCallback((e: React.KeyboardEvent) =>
        e.which === 13 ? onSignIn() : () => {
        }, [onSignIn]);

    return (
        <div className='signInWrapper'>
            <FormWrapper inputs={[
                <SimpleField
                    label={'Логин'}
                    id='login'
                    onChange={onNameChange}
                    type={'text'}
                    validator={(val: string) => val.length > 0}
                    isRequired={true}
                    isForced={true}
                />,
                <SimpleField
                    label={'Пароль'}
                    id='password'
                    onChange={onPasswordChange}
                    onKeyPress={onEnterPress}
                    type={'password'}
                    validator={(val: string) => val.length > 0}
                    isRequired={true}
                    isForced={true}
                />,
                <>{showErrorMessage
                    ? <div className="error">{someDataNotProvided}</div>
                    : authFailMessage && <div className="error">{authError} {authFailMessage}</div>
                }</>,
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onSignIn}
                >
                    Войти
                </Button>
            ]}/>
        </div>
    );
};

const mapStateToProps = (store: any) => {
    return {
        authFailMessage: store.authFailMessage,
    };
};

export default connect(mapStateToProps)(SignIn);
