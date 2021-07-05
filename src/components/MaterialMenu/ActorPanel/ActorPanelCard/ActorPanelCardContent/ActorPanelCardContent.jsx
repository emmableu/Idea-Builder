import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import ImgCard from "../../../../primitives/ImgCard";
import ImgTitleEdiText from "./ActorPanelCardContentImgTile/ImgTitleEdiText";
import ActorPanelCardContentImgTile from "./ActorPanelCardContentImgTile/ActorPanelCardContentImgTile";
import CardContent from "@material-ui/core/CardContent";

const stateArray = [...Array(5).keys()];
const ActorPanelCardContent = (props) => {
    return (
            <Grid container spacing={1}>
                {stateArray.map(((s) => (
                    <Grid item xs={6}>
                        <ActorPanelCardContentImgTile/>
                    </Grid>
                )))}
            </Grid>
    )
}

export default ActorPanelCardContent;
