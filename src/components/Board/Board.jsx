import React from "react";
import StageCard from "../Stage/StageCard";
import Box from '@material-ui/core/Box';
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import ActorPanel from "../MaterialMenu/ActorPanel/ActorPanel";

import StageSnapshots from "./StageSnapshots";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import actorImg from "../Actor/Actors";
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
        flexGrow: 1,
        backgroundColor: "white",
        display: "flex",
        height: `calc(100vh - ${globalConfig.toolBarHeight}px )`,
        margin: "8px 0px",
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
        }

    },
    tabPanel: {
        width: `${globalConfig.actorDrawerWidth}px`,
        borderRight: `1px solid #e0e0e0`,
        color: "black",
    },
    gridListTile: {
        imgFullHeight: {
            height: '1%',
            transform: 'translateX(-50%)',
            position: 'relative',
            left: '50%',
        },
        imgFullWidth: {
            width: '1%',
            position: 'relative',
            transform: 'translateY(-50%)',
            top: '50%',
        },
    },
    stateImg: {
        objectFit: "contain",
        width: "100%",
        maxHeight: "100%",
    },
    statePaper: {
        height: "50px",
    },
    spritCard: {
        width: "100%",
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

const StateGridsFromStateObj = (props) => {
    const {actorName, stateObj} = props;
    const classes = useStyles();

    return (
    <Grid container>
        <Card className={classes.actorCard}
            elevation={3}>
            <CardContent>
                <Typography variant="subtitle1">{actorName}</Typography>
                {Object.entries(stateObj).map(([stateName, imgObj]) => (
                        <>
                        <Grid item xs={6}  key={imgObj.imgID}>
                                    <Box  className={classes.statePaper}>
                                        <img
                                            className={classes.stateImg}
                                            src={imgObj.imgSrc}
                                            key={imgObj.imgID}
                                            alt={imgObj.imgID}
                                            size="small"
                                            // onDragStart={(e) => {
                                            //     dragUrl.current = e.target.alt;
                                            // }}
                                        />
                                    </Box>
                            </Grid>
                            <Typography variant="body2" noWrap={true}>
                                {stateName}
                            </Typography>
                        </>
            ))}
            </CardContent>
        </Card>

    </Grid>
)};


const ImageGrids = (props) => {
    const {actorStateMap} = props;
    const dragUrl = React.useRef();
    const classes = useStyles();
    // const actorStateMap = useSelector(state => state.actorStateMap.value);


    return (<>
                <GridList cellHeight={100} className={classes.gridList}>
                    {
                       Object.entries(actorStateMap).map(([actorName, stateObj]) => {
                           return (
                               <>
                               <StateGridsFromStateObj
                                    actorName={actorName}
                                   stateObj={stateObj}/>
                               </>
                           )
                       })
                    }
                </GridList>
            </>
    )

};


const mapStateToProps = (state) => {
    return {
        actorStateMap: state.actorStateMap.value
    }
};

const ActorPanelContent = connect(mapStateToProps)(ImageGrids);

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


const Board = () => {
    // const classes = useStyles();
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

                {/*    <Box className={classes.box}>*/}
                {/*    <StageSnapshots*/}
                {/*    />*/}
                {/*    <StageCard*/}
                {/*        images={images}*/}
                {/*        setImages={setImages}*/}
                {/*        stageRef={stageRef}*/}
                {/*        dragUrl={dragUrl}*/}
                {/*    />*/}
                {/*</Box>*/}
            </ThemeProvider>
        </>
    )
};

export default Board;





