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

const ImgTileEdiText = (props) => {
    const {actorId, _id, name, handleSave} = props;
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(name);

    return (
        <>
       { (handleSave !== null) &&
       <StyledEdiText
            submitOnUnfocus
            submitOnEnter
            cancelOnEscape
            value={value}
            type="text"
            onSave={ value =>
                {if (actorId !== undefined) {
                    handleSave(actorId, _id, value)}
                 else{
                    handleSave(_id, value)}
                    }
                }
            editButtonContent={<EditButton/>}
            editing={editing}
            showButtonsOnHover
            hideIcons={true}
        />}
        { (handleSave === null) &&
        <span> {name} </span>}
        </>
    );
}


export default ImgTileEdiText;
