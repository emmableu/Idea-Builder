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
        selectedStar.childStar.speechStar !== null &&
        selectedStar.childStar.speechStar.prototypeId !== undefined
    );

    // console.log("selectedStar.childStar.speechStar: ", selectedStar.childStar.speechStar);
    React.useEffect(() => {
        setHasSpeechBubble(
            selectedStar.childStar.speechStar !== null &&
            selectedStar.childStar.speechStar.prototypeId !== undefined
        )
    }, [
        selectedStar.childStar.speechStar !== null &&
        selectedStar.childStar.speechStar.prototypeId !== undefined])
    const deleteSpeechBubble = (e) => {
        const newStarData = {
            ...selectedStar,
            childStar: {
                ...selectedStar.childStar,
                speechStar: null
            },
        }

        dispatch(updateStarList(
            {
                storyboardId, frameId,
                starData: newStarData
            }
        ));
    }
    const menu = (
        <Menu>
            <NewSpeechBubbleMenuItem
                storyboardId={storyboardId}
                frameId={frameId}
                selectedStar={selectedStar}
                selectedActor={selectedActor}
                hasSpeechBubble={hasSpeechBubble}
            />
            <MenuItem
                disabled={!hasSpeechBubble}
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
