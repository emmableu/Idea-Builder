import React, { useState } from "react";
import EdiText from "react-editext";
import styled from 'styled-components';
import {IconButton, Tooltip} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import {updateBackdropName, updateStateName} from "../../../redux/features/projectSlice";
import {useDispatch, useSelector} from "react-redux";


const StyledEdiText = styled(EdiText)`
  button {
    border-radius: 5px;
    padding: 0;
    border: none;
    background: none;
  }
  button[editext="edit-button"] {
  }
  button[editext="save-button"] {
     display: none
  }
  button[editext="cancel-button"] {
      display: none
  }
  input, textarea {
    height: 30px;
    border-radius: 20px;
    width: 100%;
  }
  div[editext="view-container"] {
    padding: 0px 5px 0px 10px;
  }
  div[editext="edit-container"] {
    padding: 0px 2px 0px 7px;
  }
  div[editext="view"]{
    padding: 0px 0px 0px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
   }
`

const EditButton = () => (
    <Tooltip title="rename">
            <Create/>
    </Tooltip>
)

const BackdropImgTitleEdiText = (props) => {
    const {backdropId} = props;
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("backdrop");


    const sliceBackdropName = useSelector(
        state => {
            return state.project.value.backdropListJSON().find(s => s._id === backdropId).name
        }
    )

    React.useEffect(() => {
        setValue(sliceBackdropName);
    }, [sliceBackdropName]);

    const handleSave = (value) => {
        // // console.log(value);
        setValue(value);
        dispatch(
            updateBackdropName({
                "backdropId": backdropId,
                "backdropName": value
            }));
    };

    return (
        <StyledEdiText
            submitOnUnfocus
            submitOnEnter
            cancelOnEscape
            value={value}
            type="text"
            onSave={handleSave}
            editButtonContent={<EditButton/>}
            editing={editing}
            showButtonsOnHover
            hideIcons={true}
        />
    );
}


export default BackdropImgTitleEdiText;
