import {MenuItem, Tooltip} from "@material-ui/core";
import {Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React from "react";
import SearchDialog from "../../primitives/SearchDialog";

const SearchStateButton = (props) => {
    const {actorId} = props;
    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
    const [searchLoading, setSearchLoading] = React.useState(false);
    const handleClickOpen = (e) => {setSearchDialogOpen(true)};
    const handleClose = (e) => {setSearchDialogOpen(false)};


    return (
        <>
            <MenuItem
                    onClick= {handleClickOpen}
                      icon={<SearchOutlined />} > Search for a new state </MenuItem>
            <SearchDialog
                type="state"
                actorId={actorId}
                searchDialogOpen={searchDialogOpen}
                handleClose={handleClose}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}
            />

        </>
    )
}

export default SearchStateButton;
