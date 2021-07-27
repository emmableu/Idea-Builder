import {Grid, Paper} from "@material-ui/core";
import globalConfig from "../../globalConfig";
import {Button} from "antd";
import React from "react";
import DragHandleIcon from "../primitives/DragHandleIcon";
import StoryboardActionDropdown from "./StoryboardActionDropdown";
import {setSelectedStoryboardId} from "../../redux/features/projectSlice";
import {useDispatch, useSelector} from "react-redux";
import {glob} from "konva/lib/Global";

const StoryboardMenuItem = (props) => {
    const {provided, snapshot, item} = props;
    const dispatch = useDispatch();
    const selectedStoryboard = useSelector(state => state.project.value.selectedId.storyboardId);
    const [hovering, setHovering] = React.useState(false)

    const toggleHover = () => {
        setHovering(!hovering);
    }

    return (
        <Paper
            elevation={3}
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={(e) => {
                dispatch(setSelectedStoryboardId(item._id));
            }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            style={{
                width: "100%",
                userSelect: "none",
                padding: 8,
                margin: "0 0 8px 0",
                minHeight: "26px",
                backgroundColor: selectedStoryboard===item._id
                    ? globalConfig.storyboardMenuColor.menuItemOnClick.background
                    : (
                        hovering?
                            globalConfig.storyboardMenuColor.menuItemOnHover:
                            globalConfig.storyboardMenuColor.menuItem
                    ),
                color: selectedStoryboard===item._id
                    ? globalConfig.storyboardMenuColor.menuItemOnClick.text
                    : "white",
                border: snapshot.isDragging ? `2px solid ${globalConfig.storyboardMenuColor.darkPrimary}` : null,
                ...provided.draggableProps.style,
                overflow: "hidden",
            }}>
            <Button
                type="link"
                shape="circle"
                icon={<DragHandleIcon  {...provided.dragHandleProps}
                                       style={{ color: 'white'}}
                />} />
            <span style={{
                flexGrow: 1,
            }}>{'\u00A0'} {item.name}</span>
            <div
                style={{"float": "right"}}
            >
                <StoryboardActionDropdown storyboardId={item._id}/>
            </div>
        </Paper>
    )
}

export default StoryboardMenuItem;
