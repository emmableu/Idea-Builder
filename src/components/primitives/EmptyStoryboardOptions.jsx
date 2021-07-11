import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IdeaBuilderIcon from "../primitives/IdeaBuilderIcon";
import Paper from "@material-ui/core/Paper";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import {authContext, useAuth} from "../../hooks/useAuth"
import {useDispatch} from "react-redux";
import {loadDashboardFromLoginUserID} from "../../redux/features/dashboardSlice";
import Cookies from "js-cookie"
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import globalConfig from "../../globalConfig";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: "500px",
        padding: theme.spacing(4),
        backgroundColor: "inherit",
    },

    instruction: {
        color: "grey",
        fontStyle: "italic",
    },

}));


const EmptyStoryboardOptions = (props) => {
    const {text} = props;
    const classes = useStyles();


    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    className={classes.paper}>
                    <Typography component="h1" variant="subtitle1" className={classes.instruction}>
                        {text}
                    </Typography>

                </Box>
            </Container>
    );
}

export default EmptyStoryboardOptions;
