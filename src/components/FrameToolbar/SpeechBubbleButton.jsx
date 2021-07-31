import {Add, Chat} from "@material-ui/icons";
import { DownOutlined } from '@ant-design/icons';
import {Button, makeStyles, Tooltip} from "@material-ui/core";
import React from "react";
import NewSpeechBubbleMenuItem from "./NewSpeechBubbleMenuItem";
import { Menu, Dropdown } from 'antd';


const SpeechBubbleButton = (props) => {

    const menu = (
        <Menu>
            <NewSpeechBubbleMenuItem {...props}/>
        </Menu>
    );


    return (<Dropdown overlay={menu}
                      overlayStyle={{zIndex:1}}
    >
        <Button type="text"
                style={{color: "grey"}}
                onClick={e => e.preventDefault()}>
            <Chat/> {'\u00A0'} <DownOutlined />
        </Button>
    </Dropdown>)
};


export default SpeechBubbleButton;
