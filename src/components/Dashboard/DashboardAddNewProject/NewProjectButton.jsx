import {Add} from "@material-ui/icons";
import {Button, makeStyles} from "@material-ui/core";
import React from "react";
import {UserOutlined} from "@ant-design/icons";
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import globalConfig from "../../../globalConfig";
import BlankProjectMenuItem from "./BlankProjectMenuItem";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
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
                      overlayStyle={{zIndex:0}}
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
