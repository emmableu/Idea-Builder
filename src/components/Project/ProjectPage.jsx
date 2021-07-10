import React from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {loadProjectFromDatabase} from "../../redux/features/projectSlice";
import { Spin } from 'antd';
import ProjectDrawer from "./ProjectDrawer";
import Spinner from "../Spinner";


const ProjectPage = () => {
    const {uuid} = useParams();
    const dispatch = useDispatch();
    const projectData = useSelector(
        state => state.project.value
    );

    React.useEffect(() => {
            dispatch(loadProjectFromDatabase(uuid))
        }, [])

    return (
        <>
        {projectData===null && <Spinner loading={true}/>}
        {projectData!==null && <ProjectDrawer />}

        </>

    )


}

export default ProjectPage;
