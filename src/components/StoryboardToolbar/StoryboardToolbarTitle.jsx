import InputBase from "@material-ui/core/InputBase/InputBase";
import React from "react";
import {
    makeStyles,
} from '@material-ui/core/styles';
import globalConfig from "../../globalConfig";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
    storyboardTitleInput: {
        color: globalConfig.storyboardMenuColor.whiteText,
    },
}));


const StoryboardToolbarTitle = () => {
    const classes = useStyles();
    return (<FormControl fullWidth={true} >
        <InputBase placeholder="Enter storyboard title..."
                   className={classes.storyboardTitleInput}
                   id="bootstrap-input"
                   autoComplete="off" />
    </FormControl>)
}


export default StoryboardToolbarTitle;
