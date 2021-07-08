import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions} from '@material-ui/core';
import ImgCard from "./ImgCard";
import ImgTitleEdiText from "./ImgTitleEdiText";
import axios from "../../../../axiosConfig";

const ContentNode = () => (
    <ImgTitleEdiText/>
);

const CardActionButtonGroup = () => (
    <>
        <CardActions>
            <Button size="small" color="primary">
                Share
            </Button>
            <Button size="small" color="primary">
                Learn More
            </Button>
        </CardActions>
    </>
);
const ActorPanelCardContentImgTile = (props) => {
    const {stateUUID} = props;
    React.useEffect(() => {
        console.log("stateUUID: ", stateUUID);
        console.log(axios.defaults.baseURL + "/static/" + stateUUID);
        },[stateUUID]
    );

    return (
        <>
            <ImgCard
                imgSrc={axios.defaults.baseURL + "/static/" + stateUUID}
                heightToWidthRatio={'75%'}
                contentNode={<ContentNode />}
            />
        </>
    )
}



export default ActorPanelCardContentImgTile;
