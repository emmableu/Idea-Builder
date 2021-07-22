import UserInputPanelButtonGroup from "./UserInputPanelButtonGroup";
import React from "react";
import ImgCard from "../../primitives/ImgCard/ImgCard";
import {useDispatch, useSelector} from "react-redux";
import {addStar} from "../../../redux/features/projectSlice";



const UserInputPanel = (props) => {
    //, buttonGroup, dataList, imgWidth, handleSave, handleUse, handleDelete
    const dispatch = useDispatch();
    const userInputList = useSelector(state =>{
        return state.project.value.userInputList});


    const handleUse = (e, _id) => {
        dispatch(addStar(_id));
    };


    return (
        <ImgCard
            title = "User Inputs"
            type = "input"
            // buttonGroup={<UserInputPanelButtonGroup/>}
            buttonGroup={null}
            dataList = {userInputList}
            imgWidth={7}
            handleSave={null}
            handleDelete={null}
            handleUse={handleUse}
        />
    )
};

export default UserInputPanel;
// {/*<Card*/}
// {/*    title="My userInputs"*/}
// {/*    size="small"*/}
// {/*    style={{ width: "100%" }}*/}
// {/*    extra={<UserInputPanelButtonGroup*/}
// {/*        {...props}/>}>*/}
// {/*    <UserInputPanelContent/>*/}
// {/*</Card>*/}
