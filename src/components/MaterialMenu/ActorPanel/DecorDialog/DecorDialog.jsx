import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import axios from "../../../../axiosConfig";
import {Grid} from "@material-ui/core";
import ImgTile from "../../../primitives/ImgCard/ImgTile";
import ImgTileEdiText from "../../../primitives/ImgCard/ImgTileEdiText";
import {Card} from "antd";
import Paper from "@material-ui/core/Paper/Paper";
import Frame from "../../../Frame/Frame";

const BaseImage = ({ actorData }) => {
    const [img] = useImage(axios.defaults.baseURL + actorData.stateList[0]._id);
    return (
        <Image
            image={img}
            x={0}
            y={0}
            width={300}
            height={300}
            // I will use offset to set origin to the center of the image
        />
    );
};


const DecorList = (props) => {
    const [decorList, setDecorList] = React.useState([])
    React.useEffect(
        () => {
            axios({
                method: 'get',
                url: `/sample_decor_id_list/get`,
            }).then(
                res => {
                    setDecorList(res.data);
                }
            )
        }, []
    )
    return (
        <>
            <Grid container spacing={1} justifyContent="center">
                {decorList.map(imgData => (
                    <Grid item xs={1}>
                        <ImgTile
                            type="decor"
                            _id={imgData}
                            name={null}
                            imgSrc={
                                axios.defaults.baseURL + imgData
                            }
                            heightToWidthRatio="100%"
                            handleDelete={null}
                            handleUse={null}
                            contentNode={null}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export const DecorDialog = (props) => {
    const {actorData} = props;
    const [decor, setDecor] = React.useState(null);
    return (
        <>
            <DecorList/>
            <Paper
                style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'white'
                }}
                square
                elevation={4}
            >
                {/*<Stage*/}
                {/*    width={300}*/}
                {/*    height={300}*/}
                {/*>*/}
                {/*    <Layer>*/}
                {/*         <BaseImage*/}
                {/*             actorData={actorData}*/}
                {/*         />;*/}
                {/*    </Layer>*/}
                {/*</Stage>*/}

            </Paper>
        </>

    );
};

