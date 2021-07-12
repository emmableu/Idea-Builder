import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions} from '@material-ui/core';
import ImgCard from "./ImgCard";
import ImgTitleEdiText from "./ImgTitleEdiText";
import axios from "../../../../axiosConfig";
import globalConfig from "../../../../globalConfig";

const ContentNode = (props) => (
    <ImgTitleEdiText {...props}/>
);


const ActorPanelCardContentImgTile = (props) => {
    const {actorId, stateId} = props;
    React.useEffect(() => {
        // console.log("stateId: ", stateId);
        // // console.log(axios.defaults.baseURL + "/static/" + stateId);
        },[stateId]
    );

    return (
        <>
            <ImgCard
                actorId={actorId}
                stateId={stateId}
                imgSrc={axios.defaults.baseURL + stateId}
                heightToWidthRatio={'75%'}
                contentNode={<ContentNode {...props}/>}
            />
        </>
    )
}



export default ActorPanelCardContentImgTile;
