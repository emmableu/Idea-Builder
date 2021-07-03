import React, { Component } from "react";
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
import MaterialMenuSpritePanelItemButtonGroup from "./MaterialMenuSpritePanelItemButtonGroup";
import MaterialMenuSpritePanelItemContent from "./MaterialMenuSpritePanelItemContent";
import MaterialMenuSpritePanelItemTitle from "./MaterialMenuSpritePanelItemTitle";
import CostumeList from "./CostumeList";
import {CloudUpload} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import * as uuid from "uuid"
const toolBarHeight = globalConfig.toolBarHeight;
const addNewSpriteBoxHeight = globalConfig.addNewSpriteBoxHeight;

/*
    MaterialMenuSpritePanel data format:
        when pressing new button, create a new sprite, named:
        {}.
        When populating to it, it looks like this:
        {
            spriteName(str): {
                costumeName(str): {imgUUID: str(UUID), imgSrc: str(URL)}
        }
*/

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

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
    height: `calc(100vh - ${toolBarHeight}px - ${addNewSpriteBoxHeight}px)`,
    position: 'relative',
});

const getBoxStyle = () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: addNewSpriteBoxHeight,
    backgroundColor: grey[50]
    // border: 3px solid green;
});



const  MaterialMenuSpritePanel = (props) => {
    const [items, setItems] = React.useState([]);
    const onDragEnd = (result, items) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(newItems);
    }
    const handleAddNewSpriteButtonClick = (e) => {
        console.log("items: ", items);
        setItems( [...items, {
                    id: uuid.v4()
                    }]);

    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
        return (
            <DragDropContext onDragEnd={onDragEnd(items)}>
                <Box style={getBoxStyle()}>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={handleAddNewSpriteButtonClick}
                        >
                        Add new sprite
                    </Button>
                </Box>

                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {items.map((item, index) => (
                                <>
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <Card
                                                hoverable
                                                size="small"
                                                title={<MaterialMenuSpritePanelItemTitle/>}
                                                style={{ width: "100%" }}
                                                extra={<MaterialMenuSpritePanelItemButtonGroup
                                                    {...provided.dragHandleProps}/>}>
                                                    <MaterialMenuSpritePanelItemContent/>
                                            </Card>
                                        </div>
                                    )}
                                </Draggable>

                                </>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
}

// Put the thing into the DOM!
export default MaterialMenuSpritePanel;
