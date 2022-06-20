import React, {Component, useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Input } from 'antd';
import { geekblue, magenta } from '@ant-design/colors';
import grey from '@material-ui/core/colors/grey';
import { Upload, Button } from 'antd';
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import CodeIcon from '@material-ui/icons/Code';
import Box from "@material-ui/core/Box";
import {PlusOutlined, SearchOutlined, UploadOutlined, DragOutlined, DeleteTwoTone} from "@ant-design/icons";
import {CloudUpload} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import * as uuid from "uuid"
import globalConfig, {globalLog} from "../../globalConfig";
import {useDispatch, useSelector} from 'react-redux';
import * as UUID from "uuid"
import StaticFrameContainerWithAction from "../Frame/StaticFrameContainerWithAction";
import {makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {updateFrameOrder} from "../../redux/features/projectSlice";
import {getProgram, setCodeModalOpen} from "../../redux/features/codeSlice";
import Code from "../Code/Code";



const toolBarHeight = globalConfig.toolBarHeight;
const addNewActorBoxHeight = globalConfig.addNewActorBoxHeight;


const grid = 6;

const useStyles = makeStyles((theme) => ({

    paper: {
        height: globalConfig.responsiveSizeData.frameListPaperHeight,
        backgroundColor: "white",
        width: globalConfig.responsiveSizeData.frameListPaperHeight*4/3
    },
}));
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
    overflow: "auto",
    height: "100%",
    margin: "0 0",
    width: "100%",
    background: isDraggingOver ? geekblue[0] : grey[50],
    // padding: grid,
    // width: "100%",
    // overflowY: "scroll",
    // height: `calc(100vh - ${globalConfig.toolBarHeight}px
    //                      - ${globalConfig.storyboardToolBarHeight}px
    //                     - ${globalConfig.addNewActorBoxHeight}px
    //                      - ${globalConfig.storyboardPageMargin*2}px)`,
    // position: 'relative',
});


const DroppableContainer = (props) => {
    const {storyboardId, frameList, handleDelete, handleAdd, _id, hasCode} = props;
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        dispatch(updateFrameOrder({
            storyboardId,
            "beginOrder": result.source.index,
            "endOrder": result.destination.index,
        }))
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                        <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={2}
                              // className={classes.box}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >

                        {frameList.map((frameData, i) => (
                            <>
                                <Draggable key={frameData._id} draggableId={frameData._id} index={i}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {/*<ActorPanelCard*/}
                                            {/*    {...item}*/}
                                            {/*    {...provided.dragHandleProps}/>*/}
                                            <StaticFrameContainerWithAction
                                                storyboardId={storyboardId}
                                                key={frameData._id}
                                                frameIndex={i}
                                                frameData={frameData}
                                                handleDelete={handleDelete}
                                                _id={_id}
                                                idx={i}
                                                {...provided.dragHandleProps}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            </>
                        ))}
                        {provided.placeholder}
                            <Grid item xs={2} alignItems="center" spacing={1} container={true}
                                  style={{flexDirection:"column", gap:"10px"}}>
                                <Tooltip title="New Frame">
                                <Fab size="medium" color="default" aria-label="add"
                                     onClick={(e) =>{ handleAdd(e)}}
                                >
                                    <AddIcon
                                    />
                                </Fab>
                                </Tooltip>
                                {/*{*/}
                                {/* hasCode === true &&*/}
                                {/*    <Tooltip title="Show Code for this Storyboard">*/}
                                {/*        <Fab size="medium" color="secondary" aria-label="code"*/}
                                {/*             onClick={() => {dispatch(getProgram(storyboardId));*/}
                                {/*                 dispatch(setCodeModalOpen(true));*/}
                                {/*             }}*/}
                                {/*        >*/}
                                {/*            <CodeIcon*/}
                                {/*            />*/}
                                {/*        </Fab>*/}
                                {/*    </Tooltip>*/}
                                {/*}*/}
                            </Grid>
                        </Grid>
                )}
            </Droppable>
        </DragDropContext>
    );

}

export default DroppableContainer;
