import {Button, Dropdown, Menu} from "antd";
import {makeStyles, Tooltip} from "@material-ui/core";
import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import StaticFrame from "./StaticFrame";
import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card/Card";
import { Card, Avatar } from 'antd';
import {DeleteTwoTone, EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {setSelectedFrameId} from "../../redux/features/projectSlice";
import globalConfig from "../../globalConfig";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: globalConfig.responsiveSizeData.frameListPaperHeight + 32 + 2,
        backgroundColor: "white",
        width: globalConfig.responsiveSizeData.frameListPaperHeight*4/3 + 2,
        "& li": {margin: "2px 0",}
    },

}));


const StaticFrameContainerWithAction = React.memo((props) => {
    const classes = useStyles();
    const {frameData, frameIndex, handleDelete, _id} = props;
    const dispatch = useDispatch();
    const deleteFrame = (e) =>
        handleDelete(e, frameIndex)
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
                            key="edit" />
                    </Tooltip> ,
                    <SettingOutlined
                        size="small"
                        key="setting" />,
                    <Tooltip title="Delete frame">
                        <Button
                            type="link"
                            shape="circle"
                            size="small"
                            onClick={deleteFrame}
                            icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                        />
                    </Tooltip>,
                ]}
            >
            {/*    */}
            {/*<Card variant="outlined"*/}
            {/*>*/}
            {/*        <CardActionArea*/}
            {/*            onClick={(e) => {*/}
            {/*                dispatch(setSelectedFrameId(frameData._id));*/}
            {/*            }}>*/}
            {/*            <Dropdown overlay={menu} trigger={['contextMenu']}>*/}

            {/*            </Dropdown>*/}
            {/*        </CardActionArea>*/}

            </Card>
        </Grid>

    )
});

export default StaticFrameContainerWithAction;
