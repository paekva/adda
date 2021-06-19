import {Order} from "../../types";
import {AppRole} from "../../api/user";
import {getUrl} from "../../api/url";
import {useState} from "react";

export const Confirmation = (props: { selectedOrder?: Order | null, roles: AppRole[] }): JSX.Element => {

    const [url, setUrl] = useState(`${getUrl()}/orders/confirmation/get?orderId=${props.selectedOrder?.id}&status=${props.selectedOrder?.status}`);

    return <div>
        {url != '' ?
            <img
                src={url} alt={''}
                onError={(event) => setUrl('')}/>
            : props.roles.includes(AppRole.ADMIN)
                ? 'Дополнительной информации не имеется' : 'Вы еще ничего не загрузили'}

    </div>
}

