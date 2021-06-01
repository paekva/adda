import {route} from './url'
import {getAuthService} from '../components/auth/authService'
import {Method} from "./types";

const request = require('request')

const user = 'oauth2-layout'
const pass = 'oauth2-layout-password'

export const getToken = (body: string): any => {
    makeRequest(body);
}

const makeRequest = (body: string) => {
    request(
        {
            url: `${route}/oauth/token`,
            method: Method.POST,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body,
            auth: {
                user,
                pass,
            },
            strictSSL: false,
        },
        callback,
    )
};

const callback = (error: any, response: any, body: any) => {
    const ans = JSON.parse(body)
    if (ans.error) {
        getAuthService().setAuthError(ans.error_description);
        return
    }

    const token = ans.access_token
    getAuthService().setUserToken(token)
}
