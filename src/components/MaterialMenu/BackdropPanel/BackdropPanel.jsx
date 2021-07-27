import BackdropPanelButtonGroup from "./BackdropPanelButtonGroup";
import React from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, useSelector} from "react-redux";
import {addBackdropStar, deleteBackdrop, updateBackdropName} from "../../../redux/features/projectSlice";
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        backdropList: state.project.value.backdropList
    };
};

const BackdropPanel = (props) => {
    const {backdropList} = props;
    const dispatch = useDispatch();
    // const backdropList = useSelector(state =>{
    //     return state.project.value.backdropList});

    const handleSave = (data) => {
        const {_id, name} = data;
        dispatch(
            updateBackdropName({
                "backdropId": _id,
                "backdropName": name
            }));
    };

    const handleDelete = (e, _id) => {
        dispatch(deleteBackdrop(
            _id
        ));
    };

    const handleUse = (e, _id) => {
        dispatch(addBackdropStar(_id));
    };


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
};

export default connect(mapStateToProps)(BackdropPanel);
