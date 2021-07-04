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
import SpritePanelCardButtonGroup from "./SpritePanelCardButtonGroup";
import SpritePanelCardContent from "./SpritePanelCardContent";
import SpritePanelCardTitle from "./SpritePanelCardTitle";
import {CloudUpload} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import * as uuid from "uuid"
import SpritePanelCard from "./SpritePanelCard";
const toolBarHeight = globalConfig.toolBarHeight;
const addNewSpriteBoxHeight = globalConfig.addNewSpriteBoxHeight;

/*
    SpritePanel data format:
        when pressing new button, create a new sprite, named:
        {}.
        When populating to it, it looks like this:
        {
            spriteName(str): {
                costumeName(str): {imgUUID: str(UUID), imgSrc: str(URL)}
        }
*/


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 6;


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


const SpritePanelCardList = (props) => {
    const {items} = props;
    console.log("items: ", items);
    return (
        <>
            {
                items.map((item, index) => (
                    <SpritePanelCard
                        item={item}
                        index={index}/>)
                )
            }
        </>
    )
};



const SpritePanel = (props) => {
    const [items, setItems] = React.useState([]);
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
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

    useEffect(() => {
       console.log(items);
    }, [items]);

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Box style={getBoxStyle()}>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={handleAddNewSpriteButtonClick}
                        >
                        Add new sprite
                    </Button>
                </Box>

                <Droppable droppableId="droppableList">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <SpritePanelCardList items={items}/>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
}

// Put the thing into the DOM!
export default SpritePanel;
