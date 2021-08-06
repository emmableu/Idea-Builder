import React from 'react';
import {Stage, Layer, Line, Text, Image} from 'react-konva';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import globalConfig from "../../globalConfig";
import useImage from "use-image";
import axios from "../../axiosConfig";
import * as UUID from "uuid"
import Star from "../Star/Star";

const MotionStar = (props) => {
    const {starData} = props;
    const [image] = useImage(axios.defaults.baseURL + starData.prototypeId)
    return (
        <Image
            image={image}
            key={starData._id}
            {...starData}
        />
    )
}



export const MotionStage = (props) => {
    const {frameId, backdropStar, starList, selectedStar} = props;
    const isDrawing = React.useRef(false);
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const [backdropImg] = useImage(axios.defaults.baseURL + backdropStar.prototypeId);
    const [selectedStarImg, setSelectedStarImg] = React.useState(JSON.parse(JSON.stringify(selectedStar)))
    const frameRef = React.useRef(null);
    React.useEffect(() => {
        if (frameRef.current !== null) {
            frameRef.current.listening(false);
        }
    }, [])
    // const handleMouseDown = (e) => {
    //     isDrawing.current = true;
    //     const pos = e.target.getStage().getPointerPosition();
    //     console.log("--------mouse down----------")
    //     console.log("pos: ", pos);
    // };
    //
    // const handleMouseMove = (e) => {
    //     // no drawing - skipping
    //     if (!isDrawing.current) {
    //         return;
    //     }
    //     const stage = e.target.getStage();
    //     const point = stage.getPointerPosition();
    //     console.log("point: ", point);
    // };
    //
    // const handleMouseOver = () => {
    //     console.log("--------mouse over----------")
    //     const pos = e.target.getStage().getPointerPosition();
    //
    // };

    // const handleMouseOut = () => {
    //     console.log("--------mouse out----------")
    // };

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();

        setSelectedStarImg(
            {...selectedStarImg,
                x: pos.x - selectedStarImg.width/2,
                y: pos.y - selectedStarImg.height/2,
            }
        );
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        setSelectedStarImg(
            {...selectedStarImg,
                x: point.x - selectedStarImg.width/2,
                y: point.y - selectedStarImg.height/2,
            }
        );

        if (!isDrawing.current) {
            return;
        }
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <Box
            style={{
                width: "100%",
                height: globalConfig.noScaleWidth*3/4 + 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
        <Paper
            style={{width: globalConfig.noScaleWidth,
                   height: globalConfig.noScaleWidth*3/4}}
        >
            <Stage
                width={globalConfig.noScaleWidth}
                height={globalConfig.noScaleWidth*3/4}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                // onMouseOver={handleMouseOver}
                // onMouseOut={handleMouseOut}
            >
                <Layer
                    ref={frameRef}
                >

                    {
                        backdropStar._id !== null && (
                            <Image
                                image={backdropImg}
                                key={backdropStar._id}
                                id={backdropStar._id}
                                width={globalConfig.noScaleWidth}
                                height={globalConfig.noScaleWidth*3/4}
                                onClick={(e) => {
                                    console.log("clicking");
                                }}
                                onTap={(e) => {
                                    console.log("tapping");
                                }}
                            />
                        )
                    }
                    {starList.map((starData, i) => {
                        if (starData._id === selectedStar._id) {
                            return;
                        }
                        return (
                            <MotionStar
                                starData={starData}
                            />
                        );
                    })}
                </Layer>
                <Layer>
                    <MotionStar
                        starData={selectedStarImg}
                    />
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="#df4b26"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                 'source-over'
                            }
                        />))}
                </Layer>
            </Stage>
        </Paper>
        </Box>
    );
};
