import React from 'react';
import {Stage, Layer, Line, Text, Image} from 'react-konva';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import globalConfig, {globalLog} from "../../globalConfig";
import useImage from "use-image";
import axios from "../../axiosConfig";
import * as UUID from "uuid"
import "./Blink.css";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Button from "@material-ui/core/Button";
import {glob} from "konva/lib/Global";
import {StarDataHandler} from "../../data/StarData";
import {updateStarList} from "../../redux/features/projectSlice";
import {useDispatch} from "react-redux";
import {MotionStar} from "./MotionStar";
import {MotionStage} from "./MotionStage";
import { ReactReduxContext, Provider } from "react-redux";



const Instruction = React.memo(props => {
    const {isDrawing} = props;

    return (
        <div>
            Click inside the stage to start/stop recording.
            <br/>
            <RadioButtonCheckedIcon
                className={isDrawing.current?
                    "Blink":"Default"
                }
            />   {'\u00A0'} Recording
        </div>
    )
})

const ResetButton =  React.memo((props) => {
    const {toggleResetPressed} = props;
    return (
        <>
            <br/>
            <Button
                variant="contained"
                onClick={toggleResetPressed(true)}
            >
                Reset
            </Button>
        </>
    )
});


export const MotionContainer = React.memo((props) => {
    const {storyboardId, frameId, backdropStar, starList, selectedStar,
        okPressed, setOkPressed, setOkEnabled, cancelPressed, setCancelPressed
    } = props;
    const isDrawing = React.useRef(false);
    const resetPressed = React.useRef(false);
    const toggleDrawing = React.useCallback((drawing) => {
        isDrawing.current = drawing;
    }, [])
    const toggleResetPressed = React.useCallback((pressed) => {
        resetPressed.current = pressed;
    }, [])






    return (
        <Box
            style={{
                width: "100%",
                height: "inherit",
                display: "flex",
                flexDirection:"column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Instruction
                isDrawing={isDrawing}
            />

            <Paper
                style={{width: globalConfig.noScaleWidth,
                       height: globalConfig.noScaleWidth*3/4}}
            >

                <MotionStage
                    storyboardId={storyboardId}
                    frameId={frameId}
                    backdropStar={backdropStar}
                    starList={starList}
                    selectedStar={selectedStar}
                    okPressed={okPressed}
                    setOkPressed={setOkPressed}
                    cancelPressed={cancelPressed}
                    setCancelPressed={setCancelPressed}
                    setOkEnabled={setOkEnabled}
                    isDrawing={isDrawing}
                    toggleDrawing={toggleDrawing}
                    toggleResetPressed={toggleResetPressed}
                    resetPressed={resetPressed}
                />
            </Paper>
            <ResetButton
                toggleResetPressed={toggleResetPressed}
            />
        </Box>
    );
});
