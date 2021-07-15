import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions} from '@material-ui/core';
import BackdropImgCard from "./BackdropImgCard";
import BackdropImgTitleEdiText from "./BackdropImgTitleEdiText";
import axios from "../../../axiosConfig";

const ContentNode = (props) => (
    <BackdropImgTitleEdiText {...props}/>
);


const BackdropPanelCardContentImgTile = (props) => {
    const {backdropId} = props;

    return (
        <>
            <BackdropImgCard
                backdropId={backdropId}
                imgSrc={axios.defaults.baseURL + backdropId}
                heightToWidthRatio={'75%'}
                contentNode={<ContentNode {...props}/>}
            />
        </>
    )
}



export default BackdropPanelCardContentImgTile;
