import {useSelector} from "react-redux";
import StoryboardPage from "../StoryboardPage/StoryboardPage";
import EmptyStoryboardOptions from "../primitives/EmptyStoryboardOptions";
import React from "react";
import EmptyFrameCardContainer from "./EmptyFrameCardContainer";
import FrameCardContainer from "./FrameCardContainer";

const FrameCardOptions = () => {
    const frameId = useSelector(
        state =>
            state.project.value===null? 0: state.project.value.selectedId.frameId
    )
    return (
        <>
            {(frameId === undefined)  && <EmptyFrameCardContainer/>}
            {(frameId !== undefined)  && <FrameCardContainer/>}
        </>
    )
}

export default FrameCardOptions;
