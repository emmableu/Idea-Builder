import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions} from '@material-ui/core';
import ImgCard from "../../../../../primitives/ImgCard";
import ImgTitleEdiText from "./ImgTitleEdiText";

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
    return (
        <>
            <ImgCard
                heightToWidthRatio={'75%'}
                contentNode={<ContentNode />}
            />
        </>
    )
}

export default ActorPanelCardContentImgTile;
