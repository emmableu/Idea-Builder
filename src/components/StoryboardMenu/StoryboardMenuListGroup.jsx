import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as uuid from "uuid";
import globalConfig from "../../globalConfig";
import {Paper} from "@material-ui/core"
import StoryboardMenuItem from "./StoryboardMenuItem";
import Icon, {PlusCircleTwoTone, PlusOutlined} from '@ant-design/icons'
import { makeStyles } from '@material-ui/core/styles';
import {Button, Tooltip} from 'antd'
import {useSelector} from "react-redux";
import StoryboardTitleEdiText from "../StoryboardTitleBar/StoryboardTitleEdiText";
import {StoryboardSubMenu} from "./StoryboardSubMenu";



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
    const [clickedID, setClickedID] = useState(null);

    const initialColumns = {
        "final": {
            name: "My storyboards",
            items: []
        },
        "draft": {
            name: "Drafts",
            items: []
        },
    };
    const [columns, setColumns] = useState(initialColumns);

    const storyboardMenu = useSelector(state => {
        if (state.project.value === null) return;
        return JSON.stringify(state.project.value.storyboardMenu);
    })

    React.useEffect(()=> {

        console.log("USEEFFECT!!!!!!!!!!!!!!!!!!!! COLUMNS: ", columns);
        console.log("USEEFFECT!!!!!!!!!!!!!!!!!!!! storyboardListMenu: ", storyboardMenu);

        setColumns(JSON.parse(storyboardMenu));

    }, [storyboardMenu]);


    return (
        <div style={{ display: "block", justifyContent: "center", height: "100%"}}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <StoryboardSubMenu
                            columnId={columnId}
                            column={column}
                            clickedID={clickedID}
                            setClickedID={setClickedID}
                        />
                    );
                })}
            </DragDropContext>
        </div>
    );
}



export default StoryboardMenuListGroup;
