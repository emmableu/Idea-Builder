import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, Box, Button, CssBaseline, Grid} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DashboardTitleBar from "./DashboardTitleBar";
import ProjectMenu from "./ProjectMenu";
import {Add} from "@material-ui/icons";
import globalConfig from "../../globalConfig";
import ProjectTable from "./ProjectTable";

const drawerWidth = globalConfig.projectDrawerWidth;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    addButton: {
        "& span": {
            textTransform: "none",
        },
    },
    addButtonContainer: {
        "& span": {
            textTransform: "none",
        },
        width: "100%",
        padding: "10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    projectTableGrid: {
        padding: "30px 0 0 0"
    }
}));
const ProjectDrawer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <DashboardTitleBar/>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <div className={classes.addButtonContainer}>
                <Button
                    startIcon={<Add/>}
                    className={classes.addButton}
                    color="secondary"
                    variant="contained"
                > New project </Button>
                </div>
                <ProjectMenu/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box style={{height: "5vh"}}/>
                <Grid container justifyContent="center" alignItems="center" spacing={3}>
                <Grid item xs={10}>
                <ProjectTable/>
                </Grid>
                </Grid>
            </main>
        </div>
    );
}


export default ProjectDrawer;
