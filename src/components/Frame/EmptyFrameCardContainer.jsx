import React, { useEffect } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "inherit",
    },

    instruction: {
        color: "grey",
        fontStyle: "italic",
    },

}));
const EmptyFrameCardContainer = props => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography component="h1" variant="subtitle1" className={classes.instruction}>
                Your storyboard is currently empty. Please create a new frame.
            </Typography>
        </div>
    );
};

export default EmptyFrameCardContainer;
