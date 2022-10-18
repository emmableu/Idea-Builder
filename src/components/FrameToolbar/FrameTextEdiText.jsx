import React, { useState } from "react";
import EdiText from "react-editext";
import styled from 'styled-components';
import {IconButton, Tooltip} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import globalConfig, {globalLog} from "../../globalConfig";

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
    width: 400px;
    color: ${globalConfig.storyboardMenuColor.titleBar.text};
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

const FrameTextEdiText = (props) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("Hover on the text to edit");

    return (
        <>
            <StyledEdiText
                submitOnUnfocus
                submitOnEnter
                cancelOnEscape
                style={{width: "100%"}}
                value={value}
                type="text"
                onSave={val => {globalLog(val)} }
                editButtonContent={<EditButton/>}
                editing={editing}
                showButtonsOnHover
                hideIcons={true}
                // inputProps={{
                //     className: "text",
                //     placeholder: "Bla bla bla...",
                // }}
            />
        </>
    );
}


export default FrameTextEdiText;
