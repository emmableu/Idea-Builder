import React from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {loadProjectFromDatabase} from "../../redux/features/projectSlice";
import ProjectDrawer from "./ProjectDrawer";
import Spinner from "../Spinner";
import ViewMode from "../ViewMode/ViewMode";
import {loadAssets} from "../../redux/features/assetSlice";
import FrozenMode from "./FrozenMode";


const ProjectPageContainer = () => {
    const {_id} = useParams();
    const dispatch = useDispatch();
    const projectData = useSelector(
        state => state.project.value
    );

    const view = useSelector(
        state => state.mode.view
    )
    const frozenMode = useSelector(
        state => {
            // console.log("frozenmode: ", state.author.value.frozenMode)
            return state.author.value.frozenMode}
    )
    React.useEffect(() => {
            dispatch(loadProjectFromDatabase(_id))
            // dispatch(loadAssets());
        }, [])

    return (
        <>
            {frozenMode && <FrozenMode/>}
        {!frozenMode && projectData===null && <Spinner loading={true}/>}
        {!frozenMode &&  projectData!==null && view === false && <ProjectDrawer />}
        {!frozenMode &&  projectData!==null && view === true && <ViewMode />}
        </>

    )


}

export default ProjectPageContainer;
