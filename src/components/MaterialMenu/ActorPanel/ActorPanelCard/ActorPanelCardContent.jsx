import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ImgCard from './ImgCard';
import ImgTitleEdiText from './ImgTitleEdiText';
import ActorPanelCardContentImgTile from './ActorPanelCardContentImgTile';
import CardContent from '@material-ui/core/CardContent';
import { useDispatch, useSelector } from 'react-redux';

// const stateArray = [...Array(0).keys()];
const ActorPanelCardContent = props => {
    const { uuid } = props;
    const stateList = useSelector(state => {
        return state.project.value === null
            ? []
            :  state.project.value.stateListJSON(uuid);
    });

    return (
        <Grid container spacing={1}>
            {stateList.map(stateData => (
                <>
                <Grid item xs={6}>
                    <ActorPanelCardContentImgTile
                        actorUUID={uuid}
                        stateUUID={stateData.uuid} />
                </Grid>
                </>
            ))}
        </Grid>
    );
};

export default ActorPanelCardContent;