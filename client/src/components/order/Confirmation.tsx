import {Order, Status} from "../../types";
import {AppRole} from "../../api/user";
import {getConfirmation} from "../../api/orders";
import {getUrl} from "../../api/url";

export const Confirmation = (props: { selectedOrder?: Order | null, roles: AppRole[] }): JSX.Element => {

    return <div>
        <img src={`${getUrl()}/orders/confirmation/get?orderId=${1}&status=${Status.BUY_WAIT}`}/>
        {props.roles.includes(AppRole.ADMIN)
            ?
            <div>
                {props.selectedOrder?.status === Status.BUY && <div> Upload check</div>}
                {props.selectedOrder?.status === Status.UNLOAD && <div> Enter code</div>}
            </div>
            :
            <div>
                {props.roles.includes(AppRole.PURCHASER) && <div> Upload check</div>}
                {props.roles.includes(AppRole.MASTER) && <div> Enter code</div>}
            </div>
        }
    </div>
}

