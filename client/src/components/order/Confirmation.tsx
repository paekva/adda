import {Order} from "../../types";
import {AppRole} from "../../api/user";
import React, {useCallback, useState} from "react";
import {getConfirmation, setConfirmation} from "../../api/orders";
import Button from "@material-ui/core/Button"
import {displayAlert} from "../../utils";

export const Confirmation = (props: {
    selectedOrder?: Order | null,
    roles: AppRole[],
    sendUpdateMessage: (msg: string | null) => void
}): JSX.Element => {
    const [bytes, setBytes] = useState<any | null>(null);
    const [url, setUrl] = useState(props.selectedOrder ? getConfirmation(props.selectedOrder?.id, props.selectedOrder?.status) : '');

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
        (ev) => {
            if (props.selectedOrder) {
                const data = new FormData();
                data.append("file", bytes.file);
                setConfirmation(props.selectedOrder?.id, props.selectedOrder?.status, data)
                    .then((resp) => {
                        setBytes(null)
                        !resp && displayAlert("Произошла ошибка при добавлении подтверждения, попробуйте снова", props.sendUpdateMessage)
                    });
            }
        },
        [bytes, props.selectedOrder]
    );

    return <div>
        {url !== '' ?
            <img
                src={url} alt={''}
                onError={(event) => setUrl('')}/>
            : props.roles.includes(AppRole.ADMIN)
                ? 'Дополнительной информации не имеется'
                : <div>
                    <div>Вы еще ничего не загрузили</div>
                    <div className="imageLoad">
                        <input
                            className="fileInput"
                            type="file"
                            onChange={onPhotoFileChange}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={onPhotoFileSubmit}
                            disabled={bytes === null}
                            style={{width: 220, marginTop: 150}}
                        >
                            Загрузить
                        </Button>
                    </div>
                </div>
        }
    </div>
}

