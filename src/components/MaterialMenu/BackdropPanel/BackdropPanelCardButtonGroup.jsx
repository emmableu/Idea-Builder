import { Button, Tooltip } from 'antd';
import {
    DeleteTwoTone,
    DragOutlined,
    SearchOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React from 'react';
import BackdropPanelCardUploadButton from './BackdropPanelCardUploadButton';
import {useDispatch} from "react-redux";
import SearchDialog from "../../primitives/SearchDialog";

const BackdropPanelCardButtonGroup = props => {
    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
    const [searchLoading, setSearchLoading] = React.useState(false);
    const handleClickOpen = (e) => {setSearchDialogOpen(true)};
    const handleClose = (e) => {setSearchDialogOpen(false)};



    return (
        <>
            <div  style={{flex: "0 0 100px"}}>
            <BackdropPanelCardUploadButton/>
            <Tooltip title="Search for state">
                <Button type="link" shape="circle" size="large"
                        onClick= {handleClickOpen}
                        loading={searchLoading}
                        icon={<SearchOutlined />} />
            </Tooltip>


            </div>
            <SearchDialog
                _id="EMPTY"
                type="backdrop"
                searchDialogOpen={searchDialogOpen}
                handleClose={handleClose}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}

            />

        </>
    );
};

export default BackdropPanelCardButtonGroup;