import React from "react";
import Box from '@material-ui/core/Box';
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import {light} from "@material-ui/core/styles/createPalette";
import globalConfig from "../../globalConfig";
import StoryboardTitleBar from "../StoryboardTitleBar/StoryboardTitleBar";
import {MaterialMenu} from "../MaterialMenu/MaterialMenu";
import FrameCardContainer from "../Frame/FrameCardContainer";
import FrameList from "../Project/FrameList";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        display: "flex",
        maxWidth: `calc(100vw  - ${globalConfig.storyboardDrawerWidth}px)`,
        backgroundColor: "red",
        justifyContent: "space-between",
        alignItems: "stretch",
        margin: `${globalConfig.storyboardPageMargin}px 0px`,
    },
    materialMenu: {
        width: globalConfig.actorDrawerWidth,
        flex: `0 0 ${globalConfig.actorDrawerWidth}px`
    },
    outerFrameSpace: {
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: `calc(100vw  - ${globalConfig.storyboardDrawerWidth}px
                                            -  ${globalConfig.panelTabsWidth}px
                                            - ${globalConfig.actorDrawerWidth}px
                                             - ${globalConfig.noteWidth}px )`
    },
    frameList: {
        border: "5px solid yellow",
        backgroundColor: "purple",
        height: `${globalConfig.frameListHeight}px`,
        flex: `0 0 ${globalConfig.frameListHeight}px`
    },
    frameDiv: {
        border: "5px solid pink",
        backgroundColor: "red",
        height: `calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px
                         - ${globalConfig.frameListHeight}px)`,
        flex: `0 0 calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px
                         - ${globalConfig.frameListHeight}px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    noteDiv: {backgroundColor: "black",
        flex:`0 0 ${globalConfig.noteWidth}px`,
        width: globalConfig.noteWidth}


}));
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

                <div className={classes.rootContainer}>
                    <MaterialMenu
                        className={classes.materialMenu}
                    />

                    <div  className={classes.outerFrameSpace}>
                        <div
                            className = {classes.frameList}>
                            <FrameList/>
                        </div>
                        <div
                            className = {classes.frameDiv}
                        >
                            <FrameCardContainer/>
                        </div>
                        {/*<FrameList*/}
                        {/*/>*/}

                    </div>
                    <div className={classes.noteDiv} >
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
};

export default StoryboardPage;





