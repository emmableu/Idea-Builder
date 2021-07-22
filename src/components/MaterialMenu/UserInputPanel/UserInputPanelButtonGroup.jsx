import { Button, Tooltip } from 'antd';
import {
    DeleteTwoTone,
    DragOutlined,
    SearchOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React from 'react';
import UserInputPanelUploadButton from './UserInputPanelUploadButton';
import {useDispatch} from "react-redux";
import SearchDialog from "../../primitives/SearchDialog";

const UserInputPanelButtonGroup = props => {
    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
    const [searchLoading, setSearchLoading] = React.useState(false);
    const handleClickOpen = (e) => {setSearchDialogOpen(true)};
    const handleClose = (e) => {setSearchDialogOpen(false)};



    return (
        <>
            <div  style={{flex: "0 0 100px"}}>
            <UserInputPanelUploadButton/>
            </div>
        </>
    );
};

export default UserInputPanelButtonGroup;
