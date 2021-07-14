import React from "react";
import Box from '@material-ui/core/Box';
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import {light} from "@material-ui/core/styles/createPalette";
import globalConfig from "../../globalConfig";
import StoryboardTitleBar from "../StoryboardTitleBar/StoryboardTitleBar";
import {MaterialMenu} from "../MaterialMenu/MaterialMenu";
import FrameCardContainer from "../Frame/FrameCardContainer";
import FrameList from "../Project/FrameList";
import NoteBox from "../NoteBox/NoteBox";
import FrameCardOptions from "../Frame/FrameCardOptions";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        display: "flex",
        maxWidth: `calc(100vw  - ${globalConfig.storyboardDrawerWidth}px)`,
        backgroundColor: globalConfig.color.veryLightGrey,
        justifyContent: "space-between",
        alignItems: "stretch",
        margin: `${globalConfig.storyboardPageMargin}px 0px`,
    },
    materialMenu: {
        width: globalConfig.actorDrawerWidth,
        flex: `0 0 ${globalConfig.actorDrawerWidth}px`
    },
    outerFrameSpace: {
        backgroundColor:  globalConfig.color.veryLightGrey,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: `calc(100vw  - ${globalConfig.storyboardDrawerWidth}px
                                            -  ${globalConfig.panelTabsWidth}px
                                            - ${globalConfig.actorDrawerWidth}px
                                             - ${globalConfig.noteWidth}px )`,
        borderRight: "1px solid, #e0e0e0",
        padding: `0px ${globalConfig.innerBoxLeftRightPaddingEach}px`
    },
    frameList: {
        borderBottom: "1px solid #e0e0e0",
        backgroundColor:  globalConfig.color.veryLightGrey,
        height: `${globalConfig.frameListHeight}px`,
        flex: `0 0 ${globalConfig.frameListHeight}px`
    },
    frameDiv: {
        backgroundColor:  globalConfig.color.veryLightGrey,
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
        alignItems: "center",

    },
    noteDiv: {backgroundColor:  globalConfig.color.veryLightGrey,
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
                            <FrameCardOptions/>
                            {/*<FrameCardContainer/>*/}
                        </div>

                    </div>
                    <div className={classes.noteDiv} >
                        <NoteBox/>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
};

export default StoryboardPage;





