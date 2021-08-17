import React from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, connect} from "react-redux";
import {addStar} from "../../../redux/features/projectSlice";
import {createSelector} from "reselect";


const getEventList = createSelector(
    state => state.project.value.eventList,
    eventList => eventList,
);

const mapStateToProps = (state) => {
    return {
        eventList: getEventList(state),
    };
};


const EventPanel = (props) => {
    const {eventList} = props;
    const dispatch = useDispatch();

    const handleUse = React.useCallback((e, _id) => {
        dispatch(addStar({actorId: "event-events-are-different-states-under-this-same-actorId",
                        stateId: _id}));
    }, []);


    return (
        <ImgCard
            title = "Events"
            type = "event"
            // buttonGroup={<EventPanelButtonGroup/>}
            buttonGroup={null}
            dataList = {eventList}
            imgWidth={8}
            handleSave={null}
            handleDelete={null}
            handleUse={handleUse}
        />
    )
};

export default connect(mapStateToProps)(EventPanel);
