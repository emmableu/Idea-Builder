import {Add, Chat} from "@material-ui/icons";
import { DownOutlined } from '@ant-design/icons';
import {Button, makeStyles, Tooltip} from "@material-ui/core";
import React from "react";
import NewMotionMenuItem from "./NewMotionMenuItem";
import { Menu, Dropdown } from 'antd';
import {updateStarList} from "../../redux/features/projectSlice";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch} from "react-redux";
import {MotionIcon} from "../primitives/Icon/Icon";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


const MotionButton = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, starList} = props;
    const [hasMotion, setHasMotion] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (selectedStar.childStar.lineStar!== null) {
            setHasMotion(true);
        }
        else {
            setHasMotion(false);
        }

    }, [selectedStar.childStar.lineStar===null])

    const deleteMotion = (e) => {
        const newStarData = {
            ...selectedStar,
            childStar: {
                ...selectedStar.childStar,
                lineStar: null,
                motionStarList: []
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
            <NewMotionMenuItem
                storyboardId={storyboardId}
                frameId={frameId}
                selectedStar={selectedStar}
                selectedActor={selectedActor}
                backdropStar={backdropStar}
                starList={starList}
                hasMotion={hasMotion}
            />
            <MenuItem
                disabled={!hasMotion}
                onClick={deleteMotion}>Delete motion</MenuItem>
        </Menu>
    );


    return (<Dropdown overlay={menu}
                      overlayStyle={{zIndex:1}}
    >
        <Tooltip title="Record motion">
            <Button aria-label="draw motion"
                    // size="small"
                    type="text"
                    style={{color: "grey"}}
                    onClick={e => e.preventDefault()}>
               <FiberManualRecordIcon/> Motion {'\u00A0'} <DownOutlined />
            </Button>
        </Tooltip>

    </Dropdown>)
};


export default MotionButton;
