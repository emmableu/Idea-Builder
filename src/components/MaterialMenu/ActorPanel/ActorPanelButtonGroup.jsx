import { Button } from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons';
import {Tooltip} from "@material-ui/core";
import React from 'react';
import ActorPanelUploadButton from './ActorPanelUploadButton';
import {useDispatch} from "react-redux";
import SearchDialog from "../../primitives/SearchDialog";

const ActorPanelButtonGroup = props => {
    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
    const [searchLoading, setSearchLoading] = React.useState(false);
    const handleClickOpen = (e) => {setSearchDialogOpen(true)};
    const handleClose = (e) => {setSearchDialogOpen(false)};



    return (
        <>
            <>
                <div
                    style={{display: "flex", flexDirection: "column",
                        width: "100%", justifyContent:"center", alignItems: "center",
                    }}
                >
                <div>
            <ActorPanelUploadButton/>
            <Tooltip title="Search for actors">
                <Button type="link" shape="circle" size="medium"
                        onClick= {handleClickOpen}
                        loading={searchLoading}
                        icon={<SearchOutlined />} />
            </Tooltip>
                </div>
                <div>
            Add a new actor
                </div>
                </div>

            </>
            <SearchDialog
                type="state"
                searchDialogOpen={searchDialogOpen}
                handleClose={handleClose}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}
            />

        </>
    );
};

export default ActorPanelButtonGroup;
