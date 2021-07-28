import React, { useState } from "react";
import EdiText from "react-editext";
import styled from 'styled-components';
import {IconButton, Tooltip} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {updateName, updateStoryboardName} from "../../redux/features/projectSlice";
import {createSelector} from "reselect";
import {connect} from "react-redux";


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
  div[editext="edit-container"] {
    text-align: center;
  }
`

const EditButton = React.memo(() => (
    <Tooltip title="Edit storyboard title">
        <IconButton aria-label="display more actions" color="inherit" size="small">
            <Create/>
        </IconButton>
    </Tooltip>
));

const getStoryboardTitleData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    (storyboardId, storyboardList) => {
        return {
           storyboardId: storyboardId,
           storyboardTitle: storyboardList.find(s => s._id === storyboardId).name
        }
    }
);

const mapStateToProps = (state) => {
    return getStoryboardTitleData(state)
};

const StoryboardTitleEdiText = (props) => {
    const {storyboardId, storyboardTitle} = props;
    const [value, setValue] = useState(storyboardTitle);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setValue(storyboardTitle);
    }, [storyboardTitle])

    const handleSave = React.useCallback((value) => {
        setValue(value);
        dispatch(
            updateStoryboardName({
                "_id": storyboardId,
                "name": value
            }));
    }, [storyboardId]);
    return (
                <StyledEdiText
                    submitOnUnfocus
                    submitOnEnter
                    cancelOnEscape
                    value={value}
                    type="text"
                    onSave={handleSave}
                    editButtonContent={<EditButton/>}
                    editing={false}
                    showButtonsOnHover
                    hideIcons={true}
                />
    );
}


export default connect(mapStateToProps)(StoryboardTitleEdiText);
