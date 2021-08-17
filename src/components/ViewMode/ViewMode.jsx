import React from "react";
import {connect} from "react-redux";
import StaticFrameList from "../FrameList/FrameList";
import {createSelector} from "reselect";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProjectTitleBarActionGroup from "../ProjectTitleBar/ProjectTitleBarActionGroup";
import globalConfig from "../../globalConfig";
import Container from '@material-ui/core/Container';
import FrameList from "../FrameList/FrameList";


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
            <div
                style={{
                    height:globalConfig.toolBarHeight
                }}>

            </div>
            <Container maxWidth="lg"
            >
         {storyboardList.map(s => (
           <FrameList
               frameList={s.frameList}
               key={s._id}
               _id={null}
               handleDelete={null}
               handleAdd={null}
           />

         ))}
            </Container>
        </>
    )
}

export default connect(mapStateToProps)(ViewMode);
