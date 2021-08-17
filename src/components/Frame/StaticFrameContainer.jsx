import {Dropdown, Menu} from "antd";
import {makeStyles, MenuItem} from "@material-ui/core";
import React from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import CardActionArea from "@material-ui/core/CardActionArea";
import StaticFrame from "./StaticFrame";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import {setSelectedFrameId} from "../../redux/features/projectSlice";
import globalConfig from "../../globalConfig";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: globalConfig.responsiveSizeData.frameListHeight*0.75,
        backgroundColor: "white",
        width: globalConfig.responsiveSizeData.frameListHeight*0.75*4/3
    },

}));


const StaticFrameContainer = React.memo((props) => {
    const classes = useStyles();
    const {frameData, frameIndex, handleDelete, _id} = props;
    const dispatch = useDispatch();

    const menu = (
        <Menu>
            <MenuItem
                onClick={(e) =>
                    handleDelete(e, frameIndex)
                }
            >
                Delete
            </MenuItem>
        </Menu>
    );
    return (
        <Grid  item key={frameIndex}>
            <Card variant="outlined"
                  className={classes.paper}
                  style={{
                      border: frameData._id===_id? "2px solid orange":"1px solid #e0e0e0"
                  }}
            >
                <CardActionArea onClick={(e) => {
                    dispatch(setSelectedFrameId(frameData._id));
                }}>

                    {/*<FrameThumbnail*/}
                    {/*    key={frameData._id}*/}
                    {/*    frameId={frameData._id}*/}
                    {/*    frameIndex={i}*/}
                    {/*    handleDelete={handleDeleteFrame}*/}
                    {/*/>*/}

                    {/*<StaticFrameContainer*/}
                    {/*    key={frameData._id}*/}
                    {/*    storyboardId={storyboardId}*/}
                    {/*    frameIndex={i}*/}
                    {/*    frameData={frameData}*/}
                    {/*    handleDelete={handleDeleteFrame}*/}
                    {/*/>*/}
                    <>
                        {handleDelete !== null &&
                        <Dropdown overlay={menu} trigger={['contextMenu']}>
                            <StaticFrame
                                key={frameData._id}
                                frameData={frameData}
                            />
                        </Dropdown>
                        }
                        {handleDelete === null &&
                        <StaticFrame
                            key={frameData._id}
                            frameData={frameData}
                        />
                        }

                    </>

                </CardActionArea>
            </Card>
        </Grid>

    )
});

export default StaticFrameContainer;
