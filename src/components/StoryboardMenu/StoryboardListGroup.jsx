import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as uuid from "uuid";
import globalConfig from "../../globalConfig";
import {Paper} from "@material-ui/core"

const itemsFromBackend = [
    { id: uuid.v4(), content: "First task" },
    { id: uuid.v4(), content: "Second task" },
    { id: uuid.v4(), content: "Third task" },
    { id: uuid.v4(), content: "Fourth task" },
    { id: uuid.v4(), content: "Fifth task" }
];

const columnsFromBackend = {
    [uuid.v4()]: {
        name: "My storyboards",
        items: itemsFromBackend
    },
    [uuid.v4()]: {
        name: "Archived storyboards",
        items: []
    },
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function StoryboardListGroup() {
    const [columns, setColumns] = useState(columnsFromBackend);
    return (
        <div style={{ display: "block", justifyContent: "center", height: "100%" }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                backgroundColor: globalConfig.storyboardMenuColor.darkSurface,
                                width: "100%",
                            }}
                            key={columnId}
                        >
                            <Paper style={{backgroundColor: globalConfig.storyboardMenuColor.darkMenuHeader,
                                width: "100%",
                                padding: "15px 15px"}}>
                                <body style={{backgroundColor: "inherit",
                                    color: globalConfig.storyboardMenuColor.whiteText,
                                }}>{column.name}</body>
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
                                                        ? globalConfig.storyboardMenuColor.darkMenuBackgroundOnDrag
                                                        : globalConfig.storyboardMenuColor.darkMenuBackground,
                                                    width: globalConfig.storyboardDrawerWidth,
                                                    padding: 15,
                                                    minHeight: 30,
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    < MenuItemPaper provided={provided}
                                                                                    snapshot={snapshot}
                                                                                    item={item}/>
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
                    );
                })}
            </DragDropContext>
        </div>
    );
}


const MenuItemPaper = (props) => {
    const {provided, snapshot, item} = props;
    const [clicked, setClicked] = useState(false);
    return (
       < Paper
    elevation={3}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    onClick={() => setClicked(true)}
    style={{
        width: "100%",
            userSelect: "none",
            padding: 10,
            margin: "0 0 8px 0",
            minHeight: "30px",
            backgroundColor: snapshot.isDragging || clicked
            ? globalConfig.storyboardMenuColor.darkMenuOnClick
            : globalConfig.storyboardMenuColor.darkMenuItem,
            color: snapshot.isDragging || clicked
            ? "black"
            : "white",
    ...provided.draggableProps.style
    }}
>
    {item.content}
</Paper>
    )
}

export default StoryboardListGroup;
