import React, {Component, useEffect} from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Input } from 'antd';
import globalConfig from "../../../globalConfig";
import { geekblue, magenta } from '@ant-design/colors';
import grey from '@material-ui/core/colors/grey';
import { Upload, Button, Tooltip } from 'antd';
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import {PlusOutlined, SearchOutlined, UploadOutlined, DragOutlined, DeleteTwoTone} from "@ant-design/icons";
import ActorPanelCardButtonGroup from "./ActorPanelCard/ActorPanelCardButtonGroup/ActorPanelCardButtonGroup";
import ActorPanelCardContent from "./ActorPanelCard/ActorPanelCardContent/ActorPanelCardContent";
import ActorPanelCardTitle from "./ActorPanelCard/ActorPanelCardTitle";
import {CloudUpload} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import * as uuid from "uuid"
import ActorPanelCard from "./ActorPanelCard/ActorPanelCard";
import {useDispatch, useSelector} from 'react-redux';
import {addNewActor, updateActorOrder} from "../../../redux/features/projectSlice";




const toolBarHeight = globalConfig.toolBarHeight;
const addNewActorBoxHeight = globalConfig.addNewActorBoxHeight;


const grid = 6;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? magenta[0] : grey[50],

    // styles we need to apply on draggables
    ...draggableStyle
});


const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? geekblue[0] : grey[50],
    padding: grid,
    width: "100%",
    overflowY: "scroll",
    height: `calc(100vh - ${toolBarHeight}px - ${addNewActorBoxHeight}px)`,
    position: 'relative',
});

const getBoxStyle = () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: addNewActorBoxHeight,
    backgroundColor: grey[50]
    // border: 3px solid green;
});



const ActorPanel = (props) => {
    const dispatch = useDispatch();
    const actorDataList = useSelector(state =>
        state.project.value===null? []:state.project.value.actorDataList
    );

    const handleAddNewActorButtonClick = (e) => {
        dispatch(addNewActor());
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        dispatch(updateActorOrder(JSON.stringify({
            "beginOrder": result.source.index,
            "endOrder": result.destination.index,
        })))

        // const newItems = reorder(
        //     items,
        //     result.source.index,
        //     result.destination.index
        // );
        // setItems(newItems);
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Box style={getBoxStyle()}>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={handleAddNewActorButtonClick}
                    >
                        Add a new actor
                    </Button>
                </Box>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {actorDataList.map((item, index) => (
                                <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <ActorPanelCard
                                                uuid={item.uuid}
                                                {...provided.dragHandleProps}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );

}

export default ActorPanel;
