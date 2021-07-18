import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as uuid from "uuid";
import globalConfig from "../../globalConfig";
import {Paper} from "@material-ui/core"
import StoryboardMenuItem from "./StoryboardMenuItem";
import Icon, {PlusCircleTwoTone, PlusOutlined} from '@ant-design/icons'
import { makeStyles } from '@material-ui/core/styles';
import {Button, Tooltip} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import StoryboardTitleEdiText from "../StoryboardTitleBar/StoryboardTitleEdiText";
import {StoryboardSubMenu} from "./StoryboardSubMenu";
import {updateStoryboardName, updateStoryboardOrder} from "../../redux/features/projectSlice";



function StoryboardMenuListGroup() {
    const dispatch = useDispatch();


    const onDragEnd = (result) => {
        dispatch(updateStoryboardOrder(JSON.stringify(result)));
    };


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

    const columns = useSelector(state => {
        if (state.project.value === null) return;
        return state.project.value.storyboardMenu;
    })



    return (
        <div style={{ display: "block", justifyContent: "center", height: "100%"}}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result)}
            >
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <StoryboardSubMenu
                            columnId={columnId}
                            column={column}

                        />
                    );
                })}
            </DragDropContext>
        </div>
    );
}



export default StoryboardMenuListGroup;
