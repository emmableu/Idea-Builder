import FrameList from "../FrameList/FrameList";
import React from "react";
import {createSelector} from "reselect";
import {connect} from "react-redux";

const getModifiedRecommend = createSelector(
    state => state.recommend.value.modified,
    (modified) => {
        return {storyboardData:modified.storyboardList[0]}
    }
)

const mapStateToProps = (state) => {
    return getModifiedRecommend(state);
}


const ModifyingFrameList = (props) => {
    const {storyboardData} = props;
    return (
        <FrameList
            frameList={storyboardData.frameList}
            _id={null}
            handleDelete={null}
            handleAdd={null}
        />
    )
}

export default connect(mapStateToProps)(ModifyingFrameList);
