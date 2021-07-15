import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions} from '@material-ui/core';
import ActorImgCard from "./ActorImgCard";
import ActorImgTitleEdiText from "./ActorImgTitleEdiText";
import axios from "../../../../axiosConfig";
import globalConfig from "../../../../globalConfig";

const ContentNode = (props) => (
    <ActorImgTitleEdiText {...props}/>
);


const ActorPanelCardContentImgTile = (props) => {
    const {actorId, stateId} = props;

    return (
        <>
            <ActorImgCard
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
