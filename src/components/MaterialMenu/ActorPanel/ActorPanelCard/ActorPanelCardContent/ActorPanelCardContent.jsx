import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import ImgCard from "../../../../primitives/ImgCard";
import ImgTitleEdiText from "./ActorPanelCardContentImgTile/ImgTitleEdiText";
import ActorPanelCardContentImgTile from "./ActorPanelCardContentImgTile/ActorPanelCardContentImgTile";
import CardContent from "@material-ui/core/CardContent";
import {useDispatch, useSelector} from "react-redux";


// const stateArray = [...Array(0).keys()];
const ActorPanelCardContent = (props) => {
    const {uuid} = props;
    const stateList = useSelector(state =>
    {   console.log(state.project.value);
    console.log("statelist of actor: ", uuid);
       console.log(state.project.value.actorDataMap[uuid].stateList);
        return    state.project.value===null? []:state.project.value.actorDataMap[uuid].stateList}
    );


    return (
            <Grid container spacing={1}>
                {stateList.map(((stateData) => (
                    <Grid item xs={6}>
                        <ActorPanelCardContentImgTile
                            stateUUID={stateData.uuid}
                        />
                    </Grid>
                )))}
            </Grid>
    )
}

export default ActorPanelCardContent;
