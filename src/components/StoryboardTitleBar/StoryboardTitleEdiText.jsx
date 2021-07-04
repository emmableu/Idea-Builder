import React, { useState } from "react";
import EdiText from "react-editext";
import styled from 'styled-components';
import {IconButton, Tooltip} from "@material-ui/core";
import {Create} from "@material-ui/icons";


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
    width: 300px;
  }
  div[editext="view-container"]{
    padding: 5px 0px 0px;
   }
`

const EditButton = () => (
    <Tooltip title="Edit storyboard title">
        <IconButton aria-label="display more actions" color="inherit" size="small">
            <Create/>
        </IconButton>
    </Tooltip>
)

const StoryboardTitleEdiText = () => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("Grow flowers");

    const handleSave = (value) => {
        console.log(value);
        setValue(value);
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


export default StoryboardTitleEdiText;
