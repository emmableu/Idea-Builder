import React from "react";
import {createTheme, makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import {light} from "@material-ui/core/styles/createPalette";
import globalConfig from "../../globalConfig";
import StoryboardTitleBar from "../StoryboardTitleBar/StoryboardTitleBar";
import {MaterialMenu} from "../MaterialMenu/MaterialMenu";
import FrameListFunctionContainer from "../FrameList/FrameListFunctionContainer";
import NoteBox from "../NoteBox/NoteBox";
import FrameCardContainer from "../Frame/FrameCardContainer";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        display: "flex",
        maxWidth: `calc(100vw  - ${globalConfig.responsiveSizeData.storyboardDrawerWidth}px)`,
        backgroundColor: globalConfig.color.veryLightGrey,
        justifyContent: "space-between",
        alignItems: "stretch",
        margin: `${globalConfig.storyboardPageMargin}px 0px`,
    },
    materialMenu: {
        width: globalConfig.responsiveSizeData.actorDrawerWidth,
        flex: `0 0 ${globalConfig.responsiveSizeData.actorDrawerWidth}px`
    },
    outerFrameSpace: {
        backgroundColor:  globalConfig.color.veryLightGrey,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: `calc(100vw  - ${globalConfig.responsiveSizeData.storyboardDrawerWidth}px
                                            -  ${globalConfig.panelTabsWidth}px
                                            - ${globalConfig.responsiveSizeData.actorDrawerWidth}px
                                             - ${globalConfig.responsiveSizeData.noteWidth}px )`,
        borderRight: "1px solid, #e0e0e0",
        padding: `0px ${globalConfig.innerBoxLeftRightPaddingEach}px`
    },
    frameList: {
        borderBottom: "1px solid #e0e0e0",
        backgroundColor:  globalConfig.color.veryLightGrey,
        height: `${globalConfig.responsiveSizeData.frameListHeight}px`,
        flex: `0 0 ${globalConfig.responsiveSizeData.frameListHeight}px`
    },
    frameDiv: {
        backgroundColor:  globalConfig.color.veryLightGrey,
        height: `calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px
                         - ${globalConfig.responsiveSizeData.frameListHeight}px)`,
        flex: `0 0 calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px
                         - ${globalConfig.responsiveSizeData.frameListHeight}px)`,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
    },
    noteDiv: {backgroundColor:  globalConfig.color.veryLightGrey,
        flex:`0 0 ${globalConfig.responsiveSizeData.noteWidth}px`,
        width: globalConfig.responsiveSizeData.noteWidth}


}));
const StoryboardPage = React.memo(() => {
    const classes = useStyles();
    const lightTheme = createTheme({
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
                            <FrameListFunctionContainer/>
                        </div>
                        <div
                            className = {classes.frameDiv}
                        >
                            <FrameCardContainer/>
                        </div>

                    </div>
                    <div className={classes.noteDiv} >
                        <NoteBox/>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
});

export default StoryboardPage;





