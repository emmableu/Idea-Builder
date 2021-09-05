import React from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {loadProjectFromDatabase} from "../../redux/features/projectSlice";
import ProjectDrawer from "./ProjectDrawer";
import Spinner from "../Spinner";
import ViewMode from "../ViewMode/ViewMode";
import {loadAssets} from "../../redux/features/assetSlice";


const ProjectPageContainer = () => {
    const {_id} = useParams();
    const dispatch = useDispatch();
    const projectData = useSelector(
        state => state.project.value
    );

    const view = useSelector(
        state => state.mode.view
    )

    React.useEffect(() => {
            dispatch(loadProjectFromDatabase(_id))
            // dispatch(loadAssets());
        }, [])

    return (
        <>
        {projectData===null && <Spinner loading={true}/>}
        {projectData!==null && view === false && <ProjectDrawer />}
        {projectData!==null && view === true && <ViewMode />}
        </>

    )


}

export default ProjectPageContainer;
