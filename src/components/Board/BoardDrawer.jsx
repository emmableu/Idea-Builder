import React from "react";
import actorImg from "../Actor/Actors";
import Board from "./Board"
import Grid from '@material-ui/core/Grid';
import StageCard from "../Stage/StageCard";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';
import TextField from "@material-ui/core/TextField";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
import StageSnapshots from "./StageSnapshots";
import globalConfig from "../../globalConfig";
const boardContentPadding = globalConfig.boardContentPadding;

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
    content: {
        flexGrow: 1,
        padding: `${boardContentPadding}px 0px`,
        backgroundColor: "white",
        height: "100%"
    },
    tabs: {
        "& span": {
            display: "block",
            textAlign: "left",
            textTransform: "none"
        }
    }
}));

const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiGridListTile-imgFullHeight': {
            height: '50%',
            transform: 'translateX(-50%)',
            position: 'relative',
            left: '50%',
            top: '20%'
        },
        '.MuiGridListTile-imgFullWidth': {
            width: '30%',
            position: 'relative',
            transform: 'translateY(-50%)',
            top: '50%',
            left:'30%'
        },
    },
})(() => null);



const TitleInput = () => {
    return <InputBase placeholder="Enter storyboard title..."
                      id="bootstrap-input"
                      autoComplete="off" />
}


const BoardDrawer = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const classes = useStyles();
    const theme = useTheme();

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
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

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <Button className={classes.button}
                    variant="contained"
                    startIcon={<AddIcon />}> New </Button>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={classes.tabs}
            >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
        </div>
    );



    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <GlobalCss/>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar variant="dense">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <FormControl fullWidth={true} >
                            <TitleInput
                            />
                        </FormControl>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <Toolbar variant="dense" className={`${classes.toolbar} ${classes.insideBoardToolbar}`} />
                        <Board/>
                </main>
            </div>
        </ThemeProvider>
    );
};

export default BoardDrawer;





