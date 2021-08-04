import { Button, Tooltip } from 'antd';
import {
    DeleteTwoTone,
    DragOutlined,
    SearchOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React from 'react';
import {useDispatch} from "react-redux";
import {deleteActor} from "../../../redux/features/projectSlice";
import {Add} from "@material-ui/icons";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const ActorPanelImgCardButtonGroup = props => {
    const {actorId} = props;
    const dispatch = useDispatch();


    const handleDeleteActor = (e) => {
        dispatch(deleteActor(actorId));

    }
    return (
        <>
            <div  style={{flex: "0 0 60px"}}>
                <Tooltip title="Add state">
                    <Button
                        type="link"
                        shape="circle"
                        size="small"
                        icon={<PlusOutlined />}
                    />
                </Tooltip>
                <Tooltip title="Delete actor">
                    <Button
                        type="link"
                        shape="circle"
                        size="small"
                        onClick={handleDeleteActor}
                        icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                    />
                </Tooltip>
            </div>
        </>
    );
};

export default ActorPanelImgCardButtonGroup;
