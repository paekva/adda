import {getAuthService} from "../auth/authService";
import React from "react";
import {AppRole} from "../../api/user";
import Button from "@material-ui/core/Button";

const authService = getAuthService();
const mapRoleToDisplayName = {
    [AppRole.ADMIN]: "Админ",
    [AppRole.USER]: "Покупатель",
    [AppRole.COURIER]: "Курьер",
    [AppRole.LOADER]: "Загрузчик",
    [AppRole.MASTER]: "Мастер ВКД",
    [AppRole.PURCHASER]: "Закупщик",
}
export const Personal = (props: { roles: AppRole[] }): JSX.Element => {
    return <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "space-between"}}>
        <div style={{width: 200}}>{mapRoleToDisplayName[props.roles[0]]}</div>
        <Button
            type="submit"
            variant="contained"
            color="default"
            onClick={authService.logout}
            style={{height: 56, width: 200}}
        >
            Выйти
        </Button>
    </div>
}