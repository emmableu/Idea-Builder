import {Dropdown, Menu} from "antd";
import {MenuItem} from "@material-ui/core";
import React from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import CardActionArea from "@material-ui/core/CardActionArea";
import StaticFrame from "./StaticFrame";




const StaticFrameContainer = React.memo((props) => {
    const {storyboardId, frameData, frameIndex, handleDelete} = props;
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
        <>
            {handleDelete !== null &&
            <Dropdown overlay={menu} trigger={['contextMenu']}>
                <StaticFrame
                    key={frameData._id}
                    storyboardId={storyboardId}
                    frameData={frameData}
                />
            </Dropdown>
            }
            {handleDelete === null &&
            <StaticFrame
                key={frameData._id}
                storyboardId={storyboardId}
                frameData={frameData}
            />
            }

        </>
    )
});

export default StaticFrameContainer;
