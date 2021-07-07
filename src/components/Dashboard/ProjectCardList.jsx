import React from "react"
import ProjectCard from "./ProjectCard";

const projectData = [...Array(5).keys()];
const ProjectCardList = () => {
    return (
        <>
        {projectData.map(p => (
            <ProjectCard/>
        ))}
        </>
    )
}

export default ProjectCardList;
