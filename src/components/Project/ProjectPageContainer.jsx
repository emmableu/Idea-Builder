import React from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {loadProjectFromDatabase} from "../../redux/features/projectSlice";
import { Spin } from 'antd';
import ProjectDrawer from "./ProjectDrawer";
import Spinner from "../Spinner";
import {setSelectedStoryboardId} from "../../redux/features/projectSlice";
import {setSelectedFrameId} from "../../redux/features/projectSlice";
import {updateUserActionCounter} from "../../redux/features/frameThumbnailStateSlice";


const ProjectPageContainer = () => {
    const {_id} = useParams();
    const dispatch = useDispatch();
    const projectData = useSelector(
        state => state.project.value
    );

    React.useEffect(() => {
            dispatch(loadProjectFromDatabase(_id))
        }, [])


    React.useEffect( () => {
        console.log("----------------projectData: ", projectData);
        //below somehow does not seem to work, but anyway, need to update the frame status when page loaded.
        // setTimeout(() => {
        //     updateUserActionCounter();
        // }, 1000);
        }, [projectData===null]
    )

    return (
        <>
        {projectData===null && <Spinner loading={true}/>}
        {projectData!==null && <ProjectDrawer />}

        </>

    )


}

export default ProjectPageContainer;
