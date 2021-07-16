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
import SearchDialog from "../../../primitives/SearchDialog";

const ActorPanelCardButtonGroup = props => {
    const {_id} = props;
    const dispatch = useDispatch();
    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
    const [searchLoading, setSearchLoading] = React.useState(false);


    const handleClickOpen = (e) => {setSearchDialogOpen(true)};
    const handleClose = (e) => {setSearchDialogOpen(false)};


    const handleDeleteActor = (e) => {
        dispatch(deleteActor(_id));

    }
    return (
        <>
            <div  style={{flex: "0 0 100px"}}>
            <ActorPanelCardUploadButton _id={_id}/>
            <Tooltip title="Search for state">
                <Button type="link" shape="circle" size="small"
                        onClick= {handleClickOpen}
                        loading={searchLoading}
                        icon={<SearchOutlined />} />
            </Tooltip>
            <Button {...props}
                    type="link" shape="circle"  size="small" icon={<DragHandleIcon />} />

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
            <SearchDialog
                _id={_id}
                type="state"
                searchDialogOpen={searchDialogOpen}
                handleClose={handleClose}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}
            />

        </>
    );
};

export default ActorPanelCardButtonGroup;
