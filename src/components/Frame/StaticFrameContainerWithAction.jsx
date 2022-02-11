import {Button, Dropdown, Menu} from "antd";
import {makeStyles, Paper, Tooltip} from "@material-ui/core";
import React, {useCallback} from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import StaticFrame from "./StaticFrame";
import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card/Card";
import { Card, Avatar } from 'antd';
import {DeleteTwoTone, EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {addFrame, addTemplate, setSelectedFrameId, updateStarList} from "../../redux/features/projectSlice";
import globalConfig from "../../globalConfig";
import {useDispatch, useSelector} from "react-redux";
import DragHandleIcon from "../primitives/DragHandleIcon";
import NewMotionMenuItem from "../FrameToolbar/NewMotionMenuItem";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: globalConfig.responsiveSizeData.frameListPaperHeight + 32 + 2,
        backgroundColor: "white",
        width: globalConfig.responsiveSizeData.frameListPaperHeight*4/3 + 2,
        borderRadius: "2px",
        "& li": {margin: "2px 0",}
    },

}));


const StaticFrameContainerWithAction = React.memo((props) => {
    const classes = useStyles();
    const {storyboardId, frameData, frameIndex, handleDelete, _id, idx} = props;
    const dispatch = useDispatch();
    const [onceTrue, setOnceTrue] = React.useState(false);
    const deleteFrame = (e) =>
        handleDelete(e, frameIndex)

    const addFrameHere = (e, _id) =>
        dispatch(addFrame({prevIndex: idx}));

    const saveAsTemplate = (e) =>
        dispatch(addTemplate(_id));


    React.useEffect(() => {
        if (frameData.id === _id && !onceTrue) {
            setOnceTrue(true)
        }
        if (frameData._id !== _id && onceTrue) {
            dispatch(updateStarList({
                storyboardId,
                frameId: frameData._id
            }))
        }
    }, [frameData._id===_id]);

    const menu = (
        <Menu>
            <MenuItem
                onClick={addFrameHere}>New Frame</MenuItem>
            <MenuItem
                onClick={saveAsTemplate}>Add to Templates</MenuItem>
            <MenuItem
                onClick={deleteFrame}>Delete</MenuItem>
        </Menu>
    );

    return (
        <Grid  item key={frameIndex}>
            <Card
                // style={{ width: 300 }}
                size="small"
                className={classes.paper}
                hoverable
                bordered
                style={{
                    padding: "1px 1px",
                    border: frameData._id===_id? "2px solid orange":"1px solid #e0e0e0",
                }}
                cover={
                    <div
                        {...props}
                        style={{cursor:"default"}}
                        onClick={(e) => {dispatch(setSelectedFrameId(frameData._id))}}
                    >
                    <StaticFrame
                        key={frameData._id}
                        frameData={frameData}
                    />
                    </div>
                }
                bodyStyle={{padding: "0 0",
                }}
                // extra={<SettingOutlined key="setting" />}
                actions={[
                    <Tooltip title="Edit frame">
                        <EditOutlined
                            type="link"
                            size="small"
                            onClick={(e) => {dispatch(setSelectedFrameId(frameData._id))}}
                            // icon={<EditOutlined/>}
                            key="edit" />
                    </Tooltip> ,
                    <Tooltip title="Move frame">
                    <DragHandleIcon
                        type="link"
                        shape="circle"
                        style={{cursor:"grab"}}
                        size="small"
                        {...props}
                        />
                    </Tooltip>,

                    <Dropdown overlay={menu}
                              overlayStyle={{zIndex:1}}
                    >
                        <EllipsisOutlined
                            type="link"
                            shape="circle"
                            size="small"
                            // icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                        />
                    </Dropdown>,
                ]}
            >
            </Card>
        </Grid>

    )
});

export default StaticFrameContainerWithAction;
