import React from 'react';
import { Grid } from '@material-ui/core';
import BackdropPanelCardContentImgTile from './BackdropPanelCardContentImgTile';
import {useSelector} from "react-redux";

const BackdropPanelCardContent = props => {
    // const { backdropList } = props;
    const backdropList = useSelector(state =>{
        // console.log(state.project.value.backdropList());
        return state.project.value.backdropList()});

    return (
        <Grid container spacing={1} justifyContent="center">
            {backdropList.map(backdropData => (
                <>
                <Grid item xs={10}>
                    <BackdropPanelCardContentImgTile
                        backdropId={backdropData._id} />
                </Grid>
                </>
            ))}
        </Grid>
    );
};

export default BackdropPanelCardContent;
