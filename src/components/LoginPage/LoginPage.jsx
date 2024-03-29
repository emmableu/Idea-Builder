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
import {IdeaBuilderIcon} from "../primitives/Icon/Icon";
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
import {createTheme, ThemeProvider} from "@material-ui/core";
import globalConfig from "../../globalConfig";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: "380px",
        padding: theme.spacing(4),
    },
    ideaBuilderIcon: {
       fontSize: 20,
    },
    instruction: {
        color: "grey",
        fontStyle: "italic",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const LoginPage = () => {
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    const [userId, setUserID] = React.useState(null);

    React.useEffect(()=>{
        if (Cookies.get("userId") !== undefined) {
            history.replace(globalConfig.routes.dashboard);
        }
    }, [])

    const login = (e) => {
        if (userId === null) {
            return;
        }
        let { from } = location.state || { from: { pathname: `/project` } };
        auth.signin(() => {
            Cookies.set("userId", userId);
            history.replace(from);
        });
    };


    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            // console.log('value', e.target.value);
            // put the login here
            login()
        }
    }

    return (
        <ThemeProvider theme={globalConfig.dashboardTheme()}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper
                elevation={8}
                className={classes.paper}>
                <Typography component="h1" variant="h6" style={{color: "#616161"}}>
                    <IdeaBuilderIcon className={classes.ideaBuilderIcon}/>
                    {'\u00A0'} Idea Builder - CSC110 Project 1
                </Typography>
                <br />
                <Typography component="h1" variant="subtitle2" className={classes.instruction}>
                        Sign in using your unity ID
                </Typography>
                    <Box className={classes.form} noValidate onKeyDown={handleKeyPress}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="User ID"
                        name="userId"
                        autoComplete="userId"
                        autoFocus
                        onInput={ e => setUserID(e.target.value.toLowerCase())}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={login}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
        </ThemeProvider>
    );
}

export default LoginPage;
