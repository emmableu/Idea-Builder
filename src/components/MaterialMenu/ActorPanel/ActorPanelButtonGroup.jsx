import { Button } from 'antd';
import {
    SearchOutlined, StarOutlined, PlusCircleTwoTone
} from '@ant-design/icons';
import {Tooltip} from "@material-ui/core";
import React from 'react';
import ActorPanelUploadButton from './ActorPanelUploadButton';
import {useDispatch} from "react-redux";
// import SearchDialog from "../../primitives/SearchDialog";
import ActorSearchDialog from "./ActorSearchDialog";
import SearchDialog from "../../primitives/SearchDialog";

const ActorPanelButtonGroup = props => {
    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
    const [searchLoading, setSearchLoading] = React.useState(false);
    const [oldSearchDialogOpen, setOldSearchDialogOpen] = React.useState(false);
    const [oldSearchLoading, setOldSearchLoading] = React.useState(false);
    const handleClickOpen = (e) => {setSearchDialogOpen(true)};
    const handleClose = (e) => {setSearchDialogOpen(false)};
    const handleOldSearchOpen = (e) => {setOldSearchDialogOpen(true)};
    const handleOldSearchClose = (e) => {setOldSearchDialogOpen(false)};



    return (
        <>
            <>
                <div
                    style={{display: "flex", flexDirection: "column",
                        width: "100%", justifyContent:"center", alignItems: "center",
                    }}
                >
                <div>
            <Tooltip title="Required actors">
                <Button type="link" shape="circle" size="medium"
                        onClick= {handleClickOpen}
                        loading={searchLoading}
                        icon={<PlusCircleTwoTone twoToneColor="#eb2f96"/>} />
            </Tooltip>

                    <Tooltip title="Additional actors">
                        <Button type="link" shape="circle" size="medium"
                                onClick= {handleOldSearchOpen}
                                loading={oldSearchLoading}
                                icon={<SearchOutlined />} />
                    </Tooltip>

                    <ActorPanelUploadButton/>

                </div>
                <div>
                    Add a new actor
                </div>
                </div>

            </>

            <SearchDialog
                type="state"
                searchDialogOpen={oldSearchDialogOpen}
                handleClose={handleOldSearchClose}
                searchLoading={oldSearchLoading}
                setSearchLoading={oldSearchLoading}
            />


            <ActorSearchDialog
                type="actorSearch"
                searchDialogOpen={searchDialogOpen}
                handleClose={handleClose}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}
            />

        </>
    );
};

export default ActorPanelButtonGroup;
