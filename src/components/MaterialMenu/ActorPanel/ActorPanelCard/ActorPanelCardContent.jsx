import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ActorImgCard from './ActorImgCard';
import ActorImgTitleEdiText from './ActorImgTitleEdiText';
import ActorPanelCardContentImgTile from './ActorPanelCardContentImgTile';
import CardContent from '@material-ui/core/CardContent';
import { useDispatch, useSelector } from 'react-redux';

// const stateArray = [...Array(0).keys()];
const ActorPanelCardContent = props => {
    const { _id, stateList } = props;
    return (
        <Grid container spacing={1}>
            {stateList.map(stateData => (
                <>
                <Grid item xs={6}>
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
