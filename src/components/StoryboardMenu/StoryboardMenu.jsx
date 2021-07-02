import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";
import {makeStyles,} from '@material-ui/core/styles';
import globalConfig from "../../globalConfig";
import StoryboardListGroup from "./StoryboardListGroup";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: globalConfig.storyboardDrawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${globalConfig.storyboardDrawerWidth}px)`,
            marginLeft: globalConfig.storyboardDrawerWidth,
        },
        backgroundColor: "#424242",
        color: "white"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
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
        backgroundColor: "white"
    },

    drawerPaper: {
        width: globalConfig.storyboardDrawerWidth,
    },
    tabs: {
        "& span": {
            display: "block",
            textAlign: "left",
            textTransform: "none"
        }
    }
}));


const StoryboardMenu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `vertical-tab-${index}`,
            "aria-controls": `vertical-tabpanel-${index}`
        };
    };

    return (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <Button className={classes.button}
                    variant="contained"
                    startIcon={<AddIcon/>}> New </Button>
            <StoryboardListGroup/>

            {/*<Tabs*/}
            {/*    orientation="vertical"*/}
            {/*    variant="scrollable"*/}
            {/*    value={value}*/}
            {/*    onChange={handleChange}*/}
            {/*    aria-label="Vertical tabs"*/}
            {/*    className={classes.tabs}*/}
            {/*>*/}
            {/*    <Tab label="Item One" {...a11yProps(0)} />*/}
            {/*    <Tab label="Item Two" {...a11yProps(1)} />*/}
            {/*    <Tab label="Item Three" {...a11yProps(2)} />*/}
            {/*    <Tab label="Item Four" {...a11yProps(3)} />*/}
            {/*    <Tab label="Item Five" {...a11yProps(4)} />*/}
            {/*    <Tab label="Item Six" {...a11yProps(5)} />*/}
            {/*    <Tab label="Item Seven" {...a11yProps(6)} />*/}
            {/*</Tabs>*/}
        </div>
    );
};

export default StoryboardMenu;
