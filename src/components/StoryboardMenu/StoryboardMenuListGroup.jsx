import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as uuid from "uuid";
import globalConfig from "../../globalConfig";
import {Paper} from "@material-ui/core"
import StoryboardMenuItem from "./StoryboardMenuItem";
import Icon, {PlusCircleTwoTone, PlusOutlined} from '@ant-design/icons'
import { makeStyles } from '@material-ui/core/styles';
import {Button, Tooltip} from 'antd'


const itemsFromBackend = [
    { id: uuid.v4(), content: "Grow flowers" },
    { id: uuid.v4(), content: "Many people running" },
    { id: uuid.v4(), content: "Helicopter flies" },
    { id: uuid.v4(), content: "Helicopter drop waters" }
];

const columnsFromBackend = {
    [uuid.v4()]: {
        name: "My storyboards",
        items: itemsFromBackend
    },
    [uuid.v4()]: {
        name: "Drafts",
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

function StoryboardMenuListGroup() {
    const [columns, setColumns] = useState(columnsFromBackend);
    const [clickedID, setClickedID] = useState(null);

    return (
        <div style={{ display: "block", justifyContent: "center", height: "100%"}}>
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
                                <Button type="link"
                                        shape="circle"
                                        style={{"float": "right"}}
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
                                                            key={item.id}
                                                            draggableId={item.id}
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
                    );
                })}
            </DragDropContext>
        </div>
    );
}



export default StoryboardMenuListGroup;
