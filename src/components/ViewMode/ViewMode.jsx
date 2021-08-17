import React from "react";
import {connect} from "react-redux";
import StaticFrameList from "./StaticFrameList";
import {createSelector} from "reselect";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProjectTitleBar from "../ProjectTitleBar/ProjectTitleBar";
import ProjectTitleBarActionGroup from "../ProjectTitleBar/ProjectTitleBarActionGroup";
import globalConfig from "../../globalConfig";


const getStoryboardList = createSelector(
    state => state.project.value.storyboardList,
    state => state.project.value.name,
    (storyboardList, name) => {
        return {storyboardList, name}
    }
)

const mapStateToProps = (state) => {
    return getStoryboardList(state);
}

const ViewMode = (props) => {
    const {storyboardList, name} = props;
    return (
        <>
            <AppBar position="fixed" style={{
                backgroundColor: globalConfig.storyboardMenuColor.surface,
                color: globalConfig.storyboardMenuColor.whiteText,
            }}>
                <Toolbar variant="dense">
                    <div
                        style={{
                            flexGrow: 1,
                        }}
                    > {name} </div>
                    <ProjectTitleBarActionGroup />
                </Toolbar>
            </AppBar>
         {storyboardList.map(s => (
           <StaticFrameList
               storyboardData={s}
           />
         ))}
        </>
    )
}

export default connect(mapStateToProps)(ViewMode);
