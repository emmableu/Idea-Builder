import { Button, Tooltip } from 'antd';
import {
    DeleteTwoTone,
    DragOutlined,
    SearchOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React from 'react';
import DragHandleIcon from '../../../primitives/DragHandleIcon';
import ActorPanelCardUploadButton from './ActorPanelCardUploadButton';
import {useDispatch} from "react-redux";
import {deleteActor} from "../../../../redux/features/projectSlice";

const ActorPanelCardButtonGroup = props => {
    const {uuid} = props;
    const dispatch = useDispatch();

    return (
        <>
            <ActorPanelCardUploadButton uuid={uuid}/>
            <Tooltip title="Search for state">
                <Button type="link" shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Button {...props} type="link" shape="circle" icon={<DragHandleIcon />} />

            <Tooltip title="Delete actor">
                <Button
                    type="link"
                    shape="circle"
                    onClick={(e) => {dispatch(deleteActor(JSON.stringify({
                        uuid
                    })))}}
                    icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                />
            </Tooltip>
        </>
    );
};

export default ActorPanelCardButtonGroup;
