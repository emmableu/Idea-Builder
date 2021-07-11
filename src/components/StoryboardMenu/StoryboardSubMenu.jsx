import globalConfig from "../../globalConfig";
import {Paper} from "@material-ui/core";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Draggable, Droppable} from "react-beautiful-dnd";
import StoryboardMenuItem from "./StoryboardMenuItem";
import React, {useState} from "react";
import {addStoryboard} from "../../redux/features/projectSlice";
import {useDispatch} from "react-redux";

export const StoryboardSubMenu = (props) => {
    const {columnId, column, clickedID, setClickedID} = props;
    const dispatch = useDispatch();

    const handleAddStoryboard = () => {
        dispatch(addStoryboard(columnId))
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                backgroundColor: globalConfig.storyboardMenuColor.surface,
                width: "100%",
            }}
            key={columnId}
        >
            <Paper style={{backgroundColor: globalConfig.storyboardMenuColor.menuHeader,
                width: "100%",
                padding: "10px 10px",
                display: "flex",
                alignItems: "center",
                border: `0px solid ${globalConfig.storyboardMenuColor.titleBar}`
            }}>
                                <span style={{backgroundColor: "inherit",
                                    color: "white",
                                    flexGrow: 1,
                                }}>{'\u00A0'} {column.name}</span>
                <Button
                    type="ghost"
                    shape="circle"
                    style={{"float": "right"}}
                    onClick={handleAddStoryboard}
                    icon={<PlusOutlined
                        style={{fontSize: "100%", color: "white"}}
                    />} />
            </Paper>
            <div>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                        ? globalConfig.storyboardMenuColor.menuBackgroundOnDrag
                                        : globalConfig.storyboardMenuColor.menuBackground,
                                    width: globalConfig.storyboardDrawerWidth,
                                    padding: 10,
                                    minHeight: 30,
                                }}
                            >
                                {column.items.map((item, index) => {
                                    return (
                                        <Draggable
                                            key={item._id}
                                            draggableId={item._id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => {
                                                return (
                                                    < StoryboardMenuItem provided={provided}
                                                                         snapshot={snapshot}
                                                                         item={item}
                                                                         clickedID={clickedID}
                                                                         setClickedID={setClickedID}/>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        </div>
    )
}
