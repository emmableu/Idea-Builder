import React from "react"
import {useDispatch, useSelector} from "react-redux";
import StoryboardPage from "./StoryboardPage";
import EmptyStoryboardOptions from "../primitives/EmptyStoryboardOptions";

const StoryboardPageContainer = () => {
    const selectedStoryboard = useSelector(
        state => state.project.value.selectedId.storyboardId
    );
    const storyboardListLength = useSelector(
        state =>
            state.project.value===null? 0: state.project.value.storyboardList.length
    )


    return (
        <>
        {(storyboardListLength !== 0  && selectedStoryboard !== null)
            && <StoryboardPage/>}
        {(storyboardListLength === 0 )
            && <EmptyStoryboardOptions text={`Your project is currently empty. Please create a new storyboard.`}/>}
        {(storyboardListLength !== 0  && (selectedStoryboard === null))
            && <EmptyStoryboardOptions text={`Currently, no file is selected. Please select a storyboard from the file tree.`}/>}
        </>
    )
}

export default StoryboardPageContainer;
