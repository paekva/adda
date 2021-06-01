import {getAuthService} from "../auth/authService";
import React from "react";

const authService = getAuthService();
export const Personal = (): JSX.Element => {
    return <div style={{width: 200}}>
        < button onClick={authService.logout}>LOGOUT</button>
    </div>
}