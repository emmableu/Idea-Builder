import React, { useState } from "react";
import EdiText from "react-editext";
import styled from 'styled-components';
import {IconButton, Tooltip} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import globalConfig from "../../globalConfig";
import {useSelector} from "react-redux";


const StyledEdiText = styled(EdiText)`
  button {
    border-radius: 5px;
    padding: 0;
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
    color: ${globalConfig.storyboardMenuColor.titleBar.text}
  }
  div[editext="view-container"] {
   }
`

const EditButton = () => (
    <Tooltip title="Rename project">
        <IconButton aria-label="display more actions" color="inherit" size="small">
            <Create />
        </IconButton>
    </Tooltip>
)

const ProjectTitleEdiText = () => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("Green your city");

    const titleName = useSelector(state =>
        state.project.value===null? null: state.project.value.name
    )

    React.useEffect(()=> {
        setValue(titleName);
    }, [titleName]);

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


export default ProjectTitleEdiText;
