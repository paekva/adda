import {Order, Status} from "../../types";
import {AppRole} from "../../api/user";
import React, {useCallback, useState} from "react";
import {getConfirmation, setConfirmation} from "../../api/orders";
import Button from "@material-ui/core/Button"
import {displayAlert} from "../../utils";

export const Confirmation = (props: {
    selectedOrder?: Order | null,
    roles: AppRole[],
    sendUpdateMessage: (msg: string | null) => void,
    resetOnOrderUpdate: () => void,
}): JSX.Element => {
    const [bytes, setBytes] = useState<any | null>(null);
    const [url, setUrl] = useState(props.selectedOrder ?
        getConfirmation(props.selectedOrder?.id, props.selectedOrder?.status)
        : ''
    );

    const onPhotoFileChange = useCallback(
        (e) => {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                setBytes({
                    file: file,
                    imagePreviewUrl: reader.result,
                });
                console.log("set file", file);
                console.log("set imagePreviewUrl", reader.result);
            };

            reader.readAsDataURL(file);
        },
        [bytes]
    );
    const onPhotoFileSubmit = useCallback(
        () => {
            if (props.selectedOrder) {
                const data = new FormData();
                data.append("file", bytes.file);
                const statusString: string = props.selectedOrder?.status
                    .toString()
                    .replace("ACCEPTANCE", "")
                    .replace("WAIT", "")
                    .replace("ERROR", "")
                    .replace("_", "")

                const status: Status = Status[statusString as keyof typeof Status]

                setConfirmation(props.selectedOrder?.id, status ? status : Status.UNKNOWN, data)
                    .then((resp) => {
                        setBytes(null)
                        resp && props.resetOnOrderUpdate()
                        !resp && displayAlert("Произошла ошибка при добавлении подтверждения, попробуйте снова", props.sendUpdateMessage)
                    });
            }
        },
        [bytes, props.selectedOrder]
    );

    console.warn(url)
    return <div>
        {url !== '' ?
            <img
                src={url} alt={''}
                onError={() => setUrl('')}/>
            : props.roles.includes(AppRole.ADMIN)
                ? 'Дополнительной информации не имеется'
                : <div>
                    <div>Вы еще ничего не загрузили</div>
                </div>
        }

        <div className="imageLoad">
            <input
                className="fileInput"
                type="file"
                onChange={onPhotoFileChange}
                disabled={props.selectedOrder?.status.includes('WAIT')}
            />
        </div>
        <Button
            variant="contained"
            color="default"
            onClick={onPhotoFileSubmit}
            disabled={props.selectedOrder?.status.includes('WAIT')
            || bytes === null}
            style={{width: 220, marginTop: 150}}
        >
            Загрузить
        </Button>
    </div>
}

