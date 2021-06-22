import {Order} from "../../types";
import {AppRole} from "../../api/user";
import {useState} from "react";
import {getConfirmation} from "../../api/orders";

export const Confirmation = (props: { selectedOrder?: Order | null, roles: AppRole[] }): JSX.Element => {

    const [url, setUrl] = useState(props.selectedOrder ? getConfirmation(props.selectedOrder?.id, props.selectedOrder?.status) : '');

    return <div>
        {url != '' ?
            <img
                src={url} alt={''}
                onError={(event) => setUrl('')}/>
            : props.roles.includes(AppRole.ADMIN)
                ? 'Дополнительной информации не имеется' : 'Вы еще ничего не загрузили'}

    </div>
}

