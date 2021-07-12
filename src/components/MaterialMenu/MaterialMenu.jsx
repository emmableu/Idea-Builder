import Box from "@material-ui/core/Box";
import ActorPanel from "./ActorPanel/ActorPanel";
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Panorama, Theaters, Widgets} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import globalConfig from "../../globalConfig";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        display: "flex",
        height: `calc(100vh - ${globalConfig.toolBarHeight}px - ${globalConfig.storyboardToolBarHeight}px - ${globalConfig.storyboardPageMargin*2}px)`,
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

export const MaterialMenu = () => {
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
