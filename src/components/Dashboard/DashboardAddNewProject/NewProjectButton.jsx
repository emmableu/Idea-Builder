import {Add} from "@material-ui/icons";
import {Button, makeStyles} from "@material-ui/core";
import React from "react";
import BlankProjectMenuItem from "./BlankProjectMenuItem";
import { Menu, Dropdown } from 'antd';
import UploadProjectMenuItem from "./UploadProjectMenuItem";

const menu = (
    <Menu>
        <BlankProjectMenuItem/>
        <UploadProjectMenuItem />
    </Menu>
);

const NewProjectButton = () => {

    return (<Dropdown overlay={menu}
                      placement="bottomCenter"
                      overlayStyle={{zIndex:1}}
        >
        <Button
                onClick={e => e.preventDefault()}
                startIcon={<Add/>}
                color="secondary"
                variant="contained"
            > New Project
                        </Button>
    </Dropdown>)
};


export default NewProjectButton;
