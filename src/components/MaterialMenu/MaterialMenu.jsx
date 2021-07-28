import Box from "@material-ui/core/Box";
import ActorPanel from "./ActorPanel/ActorPanel";
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Panorama, Theaters, Face, Widgets, Mouse, Chat, ExposurePlus1} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import globalConfig from "../../globalConfig";
import BackdropPanel from "./BackdropPanel/BackdropPanel";
import TemplatePanel from "./TemplatePanel/TemplatePanel";
import EventPanel from "./EventPanel/EventPanel";
import {SpeechBubblePanel} from "./SpeechBubblePanel/SpeechBubblePanel";


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
        width: `${globalConfig.responsiveSizeData.actorDrawerWidth}px`,
        height: `calc(100vh - ${globalConfig.toolBarHeight}px - ${globalConfig.storyboardToolBarHeight}px - ${globalConfig.storyboardPageMargin*2}px)`,
        borderRight: `1px solid #e0e0e0`,
        color: "black",
        overflow:"scroll"
    },
}));


function TabPanel(props) {
    const classes = useStyles();
    const { children, value, tabData, index, ...other } = props;

    return (
        <div
            className={classes.tabPanel}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent:"center",
                    padding: "0px 5px",
                }}
            >
                {tabData.panel}
            </Box>
        </div>
    );
}

function a11yProps(tabData, index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
        tabData: tabData,
    };
}

export const MaterialMenu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabList = [
        {
            label: "Actors",
            icon: <Face/>,
            panel: <ActorPanel/>
        },
        {
            label: "Backdrops",
            icon: <Panorama/>,
            panel: <BackdropPanel/>
        },
        {
            label: "UI Widgets",
            icon: <Widgets/>,
            panel: <div />
        },
        {
            label: "Keyboard & Mouse",
            icon: <Mouse/>,
            panel: <EventPanel />
        },
        // {
        //     label: "Speech Bubbles",
        //     icon: <Chat/>,
        //     panel: <SpeechBubblePanel />
        // },
        {
            label: "Resources",
            icon: <ExposurePlus1/>,
            panel: <div />
        },
        {
            label: "Templates",
            icon: <Theaters/>,
            panel: <TemplatePanel />
        },
    ];

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
                {tabList.map(
                    (tabData, index) =>
                        (<Tab icon={tabData.icon} label={tabData.label} {...a11yProps(index)}/>)
                            )
                    }
            </Tabs>
            {tabList.map(
                (tabData, i) => (<TabPanel
                                value={value}
                                index={i}
                                tabData={tabData}
                >
                </TabPanel>)
            )}
        </div>
    );
}
