import {Add, Chat} from "@material-ui/icons";
import { DownOutlined } from '@ant-design/icons';
import {Button, makeStyles, Tooltip} from "@material-ui/core";
import React from "react";
import NewSpeechBubbleMenuItem from "./NewSpeechBubbleMenuItem";
import { Menu, Dropdown } from 'antd';
import {updateStarList} from "../../redux/features/projectSlice";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch} from "react-redux";


const SpeechBubbleButton = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor} = props;
    const dispatch = useDispatch()
    const [hasSpeechBubble, setHasSpeechBubble] = React.useState(
        selectedStar.childStarList.findIndex(s => s.type === "speech") !== -1
    );

    const deleteSpeechBubble = (e) => {
        const speechBubbleIndex = selectedStar.childStarList.findIndex(s => s.type === "speech")
        console.log("speechbubleindex: ", speechBubbleIndex);
        if (speechBubbleIndex === -1) {
            return;
        }
        const newChildStarList = selectedStar.childStarList.slice();
        newChildStarList.splice(speechBubbleIndex, 1);
        const newStarData = {
            ...selectedStar,
            childStarList: newChildStarList,
        }
        console.log("newChildStarList: ", newChildStarList);
        console.log("newStarData: ", newStarData);
        dispatch(updateStarList(
            {
                storyboardId, frameId,
                starData: newStarData
            }
        ));
        setHasSpeechBubble(false);
    }
    const menu = (
        <Menu>
            <NewSpeechBubbleMenuItem
                storyboardId={storyboardId}
                frameId={frameId}
                selectedStar={selectedStar}
                selectedActor={selectedActor}
                hasSpeechBubble={hasSpeechBubble}
                setHasSpeechBubble={setHasSpeechBubble}
            />
            <MenuItem
                disabled={hasSpeechBubble===false}
                onClick={deleteSpeechBubble}>Delete speech bubble</MenuItem>
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
