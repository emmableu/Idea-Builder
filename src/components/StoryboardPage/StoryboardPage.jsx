import React from "react";
import FrameCard from "../Frame/FrameCard";
import Box from '@material-ui/core/Box';
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import ActorPanel from "../MaterialMenu/ActorPanel/ActorPanel";

import FrameList from "../Project/FrameList";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import actorImg from "../Star/Stars";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import {light} from "@material-ui/core/styles/createPalette";
import {Panorama, Widgets, Theaters, CloudUpload} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import {UploadButton} from "../Upload/UploadButton"
import {useDispatch, useSelector} from "react-redux";

import { connect } from 'react-redux'
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import globalConfig from "../../globalConfig";
import StoryboardTitleBar from "../StoryboardTitleBar/StoryboardTitleBar";




const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        display: "flex",
        height: `calc(100vh - ${globalConfig.toolBarHeight}px - ${globalConfig.storyboardToolBarHeight}px - ${globalConfig.storyboardPageMargin*2}px)`,
        margin: `${globalConfig.storyboardPageMargin}px 0px`,
        float: "left"
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        color: "black",
        "& span": {
            textTransform: "none",
            fontSize: "10px"
        },
        "& button": {
            minWidth: `1vw`,
        },
        width: globalConfig.panelTabsWidth,
    },
    tabPanel: {
        width: `${globalConfig.actorDrawerWidth}px`,
        height: `calc(100vh - ${globalConfig.toolBarHeight}px - ${globalConfig.storyboardToolBarHeight}px - ${globalConfig.storyboardPageMargin*2}px)`,
        borderRight: `1px solid #e0e0e0`,
        color: "black",
    },
    box: {
        flexGrow: 1,
        overflow: "hidden"
    }
}));







function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return (
        <div
            className={classes.tabPanel}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
                <Box>
                    {index === 0 && <ActorPanel/>}
                </Box>
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}

const VerticalTabs = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab icon={<Widgets />} label="Actors" {...a11yProps(0)} />
                <Tab icon={<Panorama/>} label="Backdrops" {...a11yProps(1)} />
                <Tab icon={<Theaters/>} label="Templates" {...a11yProps(2)} />

            </Tabs>
            <TabPanel value={value} index={0}>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    );
}


const StoryboardPage = () => {
    const classes = useStyles();
    const lightTheme = createMuiTheme({
        palette: {
            type: 'light',
        },
    });


    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <StoryboardTitleBar />
                <VerticalTabs/>

                <Box className={classes.box}>
                <FrameList
                />
                <FrameCard
                />
                </Box>
            </ThemeProvider>
        </>
    )
};

export default StoryboardPage;





