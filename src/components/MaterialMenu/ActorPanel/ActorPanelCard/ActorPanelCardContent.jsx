import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ActorImgCard from './ActorImgCard';
import ActorImgTitleEdiText from './ActorImgTitleEdiText';
import ActorPanelCardContentImgTile from './ActorPanelCardContentImgTile';
import CardContent from '@material-ui/core/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import globalConfig from "../../../../globalConfig";

// const stateArray = [...Array(0).keys()];
const ActorPanelCardContent = props => {
    const { _id, stateList } = props;
    let xsSize = 6;
    if (globalConfig.mode === "SMALL") {
        xsSize = 9;
    }
    return (
        <Grid container spacing={1} justifyContent="center">
            {stateList.map(stateData => (
                <>
                <Grid item xs={xsSize}>
                    <ActorPanelCardContentImgTile
                        actorId={_id}
                        stateId={stateData._id} />
                </Grid>
                </>
            ))}
        </Grid>
    );
};

export default ActorPanelCardContent;
