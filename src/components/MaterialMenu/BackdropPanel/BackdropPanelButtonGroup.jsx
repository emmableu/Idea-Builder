import { Button } from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons';
import {Tooltip} from "@material-ui/core";
import React from 'react';
import BackdropPanelUploadButton from './BackdropPanelUploadButton';
import SearchDialog from "../../primitives/SearchDialog";

const BackdropPanelButtonGroup = props => {
    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
    const [searchLoading, setSearchLoading] = React.useState(false);
    const handleClickOpen = (e) => {setSearchDialogOpen(true)};
    const handleClose = (e) => {setSearchDialogOpen(false)};



    return (
        <>
            <div  style={{flex: "0 0 100px"}}>
            <BackdropPanelUploadButton/>
            <Tooltip title="Search for backdrop">
                <Button type="link" shape="circle" size="medium"
                        onClick= {handleClickOpen}
                        loading={searchLoading}
                        icon={<SearchOutlined />} />
            </Tooltip>


            </div>
            <SearchDialog
                type="backdrop"
                searchDialogOpen={searchDialogOpen}
                handleClose={handleClose}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}

            />

        </>
    );
};

export default BackdropPanelButtonGroup;
