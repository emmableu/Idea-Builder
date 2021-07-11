import React from "react";
import StoryboardPage from "../StoryboardPage/StoryboardPage"
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import StoryboardMenu from '../StoryboardMenu/StoryboardMenu'
import MoreIcon from '@material-ui/icons/MoreVert';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    useTheme,
    createMuiTheme,
} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import InfoIcon from '@material-ui/icons/Info';
import styled from 'styled-components';
import FrameList from "./FrameList";
import globalConfig from "../../globalConfig";
import ProjectTitleBar from "../ProjectTitleBar/ProjectTitleBar";
import StoryboardActionDropdown from "../StoryboardMenu/StoryboardActionDropdown";
import {Grid, Typography} from "@material-ui/core";
import ArtTrack from "@material-ui/core/SvgIcon/SvgIcon";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ProjectTitleBarActionGroup from "../ProjectTitleBar/ProjectTitleBarActionGroup";
import StoryboardPageContainer from "../StoryboardPage/StoryboarPageContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: globalConfig.storyboardDrawerWidth,
        flexShrink: 0,
        backgroundColor: globalConfig.storyboardMenuColor.surface,
    },
    baseAppBar: {
        backgroundColor: globalConfig.storyboardMenuColor.titleBar,
        color: globalConfig.storyboardMenuColor.whiteText,
    },
    iconButton: {
        marginRight: theme.spacing(2)
    },
    appBar: {
        width: `calc(100% - ${globalConfig.storyboardDrawerWidth}px)`,
        marginLeft: globalConfig.storyboardDrawerWidth,
        backgroundColor: globalConfig.storyboardMenuColor.surface,
        color: globalConfig.storyboardMenuColor.whiteText,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
        width: "90%",
    },
    // necessary for content to be below app bar
    toolbar: {
        height: globalConfig.toolBarHeight,
    },

    insideBoardToolbar: {
        backgroundColor: globalConfig.storyboardMenuColor.surface,
        height: globalConfig.toolBarHeight,
    },

    drawerPaper: {
        width: globalConfig.storyboardDrawerWidth,
        backgroundColor: globalConfig.storyboardMenuColor.surface,
        position: "fixed",
        zIndex: 0,
    },
    content: {
        flexGrow: 1,
        backgroundColor: "white",
        height: "100%"
    },
    storyboardTitleInput: {
        color: globalConfig.storyboardMenuColor.whiteText,
    },
    tabs: {
        "& span": {
            display: "block",
            textAlign: "left",
            textTransform: "none"
        }
    }
}));



const ProjectDrawer = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const classes = useStyles();

    return (
            <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar variant="dense">
                            <ProjectTitleBar />
                            <ProjectTitleBarActionGroup />
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <StoryboardMenu/>
                        </Drawer>
                </nav>

                <main className={classes.content}>
                    <Toolbar variant="dense" className={`${classes.toolbar} ${classes.insideBoardToolbar}`} />
                        <StoryboardPageContainer/>
                </main>
            </div>
    );
};

export default ProjectDrawer;





