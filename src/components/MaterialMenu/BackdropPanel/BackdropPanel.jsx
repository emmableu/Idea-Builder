import BackdropPanelButtonGroup from "./BackdropPanelButtonGroup";
import React, {useCallback} from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, useSelector} from "react-redux";
import {addBackdropStar, deleteBackdrop, updateBackdropName} from "../../../redux/features/projectSlice";
import { connect } from 'react-redux';
import { createSelector } from 'reselect'


const getBackdropList = createSelector(
    state => state.project.value.backdropList,
    backdropList => backdropList,
);

const mapStateToProps = (state) => {
    return {
        backdropList: getBackdropList(state),
    };
};

const BackdropPanel = React.memo((props) => {
    const {backdropList} = props;
    const dispatch = useDispatch();
    console.log("backdroppanel rerendering!-------"); //does not rerender now

    const handleSave = React.useCallback((data) => {
        const {_id, name} = data;
        dispatch(
            updateBackdropName({
                "backdropId": _id,
                "backdropName": name
            }));
    }, [backdropList]);

    const handleDelete = React.useCallback((e, _id) => {
        dispatch(deleteBackdrop(
            _id
        ));
    }, [backdropList]);

    const handleUse = React.useCallback((e, _id) => {
        dispatch(addBackdropStar(_id));
    }, [backdropList]);


    return (
        <ImgCard
            title = "My backdrops"
            type= "backdrop"
            buttonGroup={<BackdropPanelButtonGroup/>}
            dataList = {backdropList}
            imgWidth={10}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleUse={handleUse}
        />
    )
});

export default connect(mapStateToProps)(BackdropPanel);
