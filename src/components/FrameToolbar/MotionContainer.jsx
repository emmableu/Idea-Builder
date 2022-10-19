import React from 'react';
import {Stage, Layer, Line, Text, Image} from 'react-konva';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import globalConfig, {globalLog} from "../../globalConfig";
import "./Blink.css";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Button from "@material-ui/core/Button";
import {MotionStage} from "./MotionStage";



const Instruction = React.memo(props => {
    const {isDrawing} = props;

    return (
        <div>
            Click inside the stage to start/stop recording.
            <br/>
            <RadioButtonCheckedIcon
                className={isDrawing?
                    "Blink":"Default"
                }
            />   {'\u00A0'} Recording
        </div>
    )
})

const ResetButton =  React.memo((props) => {
    const {setResetPressed} = props;
    return (
        <>
            <br/>
            <Button
                variant="contained"
                onClick={(e) => setResetPressed(true)}
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
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [resetPressed, setResetPressed] = React.useState(false);

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
                    setIsDrawing={setIsDrawing}
                    setResetPressed={setResetPressed}
                    resetPressed={resetPressed}
                />
            </Paper>
            <ResetButton
                setResetPressed={setResetPressed}
            />
        </Box>
    );
});
