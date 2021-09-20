import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import axios from "../../../../axiosConfig";
import {Grid} from "@material-ui/core";
import ImgTile from "../../../primitives/ImgCard/ImgTile";
import Paper from "@material-ui/core/Paper/Paper";
import {Input, Modal} from "antd";
import {addActor, updateStateName} from "../../../../redux/features/projectSlice";
import * as UUID from "uuid";
import {useDispatch} from "react-redux";
import {globalLog} from "../../../../globalConfig";

const DecorStar = (props) => {
    const {_id, x} = props;
    const [image] = useImage(axios.defaults.baseURL + _id);
    if (image !== undefined) {
        image.crossOrigin = "Anonymous";
    }
    return (
        <Image
            image={image}
            x={x}
            y={0}
            width={50}
            height={50}
        />
    )
}

const SampleDecorList = (props) => {
    const {decorList, setDecorList} = props;
    const [sampleDecorList, setSampleDecorList] = React.useState([])

    React.useEffect(
        () => {
            axios({
                method: 'get',
                url: `/sample_decor_id_list/get`,
            }).then(
                res => {
                    setSampleDecorList(res.data);
                }
            )
        }, []
    )

    const handleUse = React.useCallback((e, _id) => {
        setDecorList([...decorList, _id])
        globalLog("decorList: ", decorList)
    }, [decorList]);

    return (
        <>
            <Grid container spacing={1} justifyContent="center">
                {sampleDecorList.map(imgData => (
                    <Grid item xs={1}
                          key={imgData}
                    >
                        <ImgTile
                            type="decor"
                            _id={imgData}
                            name={null}
                            imgSrc={
                                axios.defaults.baseURL + imgData
                            }
                            heightToWidthRatio="100%"
                            handleDelete={null}
                            handleUse={handleUse}
                            contentNode={null}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export const DecorDialog = (props) => {
    const {actorData, okPressed, setOkPressed, setOkEnabled, cancelPressed, setCancelPressed} = props;
    const decorStageRef = React.useRef(null);
    const [decorList, setDecorList] = React.useState([]);
    const [stateName, setStateName] = React.useState("");
    const stateData = actorData.stateList[0];
    const [image] = useImage(axios.defaults.baseURL + stateData._id);

    const dispatch = useDispatch()
    let tentativeWidth = 200;
    let tentativeHeight = 200;
    if (image !== undefined) {
        const ratio = image.height/image.width;
        if (ratio > 1) {
            tentativeHeight = 200;
            tentativeWidth = 200/ratio;
        }
        else {
            tentativeHeight = 200*ratio;
            tentativeWidth = 200;
        }
        image.crossOrigin = "Anonymous";
    }
    React.useEffect(() => {
        if (decorStageRef.current!==null) {
            decorStageRef.current.listening(false);
        }
    }, [])

    React.useEffect(() => {
        setOkEnabled(decorList.length>0 && stateName!=="");
    }, [decorList.length>0 && stateName!==""])

    React.useEffect(() => {
        if (cancelPressed === false) {
            return;
        }

        setCancelPressed(false);
        setStateName("");
        setDecorList([]);
    }, [cancelPressed])

    React.useEffect(() => {
        if (okPressed === false) {
            return;
        }
        decorStageRef.current.toImage({
            pixelRatio: 1,
            callback(img) {
                img = img.src;
                axios({
                    method: "post",
                    url: "/state/upload/img",
                    data: {img},
                }).then(response => {
                    dispatch(updateStateName(
                        {
                            actorId: actorData._id,
                            stateId: response.data._id,
                            stateName: stateName,
                        }
                    ))
                })
            }
        });

        setOkPressed(false);
        setStateName("");
        setDecorList([]);
    }, [okPressed])
    return (
        <>
            <SampleDecorList
                decorList={decorList}
                setDecorList={setDecorList}
            />
            <div
                style={{
                    width: "100%",
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection:"column"
                }}
            >
            <Paper
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'white'
                }}
                variant="outlined"
            >
                <Stage
                    ref={decorStageRef}
                    width={200}
                    height={200}
                >
                    <Layer
                    >
                        <Image
                            image={image}
                            x={0}
                            y={0}
                            width={tentativeWidth}
                            height={tentativeHeight}
                        />

                        {decorList.map((_id, i) => {
                            return (
                                <DecorStar
                                    key={_id}
                                    _id={_id}
                                    x={200-(i+1)*50}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
            </Paper>
                <br/>
                <Input
                    onChange={e => setStateName(e.target.value)}
                    placeholder="State Name"
                />
            </div>
        </>

    );
};

