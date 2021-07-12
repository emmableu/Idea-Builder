import React from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {loadProjectFromDatabase} from "../../redux/features/projectSlice";
import { Spin } from 'antd';
import ProjectDrawer from "./ProjectDrawer";
import Spinner from "../Spinner";
import {setSelectedStoryboard} from "../../redux/features/selectedStoryboardSlice";
import {setSelectedFrameId} from "../../redux/features/selectedFrameSlice";


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
        if (projectData === null) return;
        const selectedStoryboard = projectData.storyboardMenu.final.items[0]._id
        dispatch(setSelectedStoryboard(selectedStoryboard));
        dispatch(setSelectedFrameId(projectData.getStoryboard(selectedStoryboard).frameList[0]._id));
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
