import {Input, Rate} from 'antd';
import Paper from "@material-ui/core/Paper";
import globalConfig from "../../globalConfig";
import {createSelector} from "reselect";
import * as React from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import {saveNote, saveNoteInMemory, saveRating} from "../../redux/features/projectSlice";
import {useDispatch, connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useCallback} from "react";
import { debounce } from "lodash";
import ExampleEval from "../ExampleEval";
const { TextArea } = Input;

const calcBoxHeight = (windowInnerHeight) => {
    return windowInnerHeight
        - globalConfig.toolBarHeight
        - globalConfig.storyboardToolBarHeight
        - globalConfig.storyboardPageMargin*2 - 30 - 300
}
const getStoryboardNoteData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    (storyboardId, storyboardList) => {
        if (storyboardId === null) {
            return {
                storyboardId: null,
                note: "",
                confidenceRating: 0,
                knowledgeRating: 0,
            }
        }
        const s = storyboardList.find(s => s._id === storyboardId)
        const note = s?s.note:"";
        const confidenceRating = s && s.confidenceRating ? s.confidenceRating: 0;
        const knowledgeRating = s && s.knowledgeRating ? s.knowledgeRating: 0;
        console.log("confidenceRating: ", confidenceRating);
        return {
            storyboardId: storyboardId,
            note,
            confidenceRating,
            knowledgeRating,
        }
    }
);

const mapStateToProps = (state) => {
    return getStoryboardNoteData(state)
};


const NoteBox = (props) => {
    const {storyboardId, note, confidenceRating, knowledgeRating} = props;
    const dispatch = useDispatch();
    const editorHeight = calcBoxHeight(window.innerHeight);

    const handleChangeConfidence = (val) => {dispatch(saveRating({storyboardId, type:"confidenceRating", val}))};
    const handleChangeKnowledge = (val) => {dispatch(saveRating({storyboardId, type: "knowledgeRating", val}))};

    const dispatchSaveNote = (storyboardId, text) => dispatch(saveNote({storyboardId, text}));


    const saveNoteDebounce = useCallback(debounce(dispatchSaveNote, 700), [])

    const onFieldTextChange = async (e) => {
        const text = e.target.value
        dispatch(saveNoteInMemory( {storyboardId, text} ))
        saveNoteDebounce(storyboardId, text);
    };

    return(
        <div style={{  width: "100%",
            height: "100%",
            backgroundColor: globalConfig.color.veryLightGrey,
            padding: "10px 10px",
            overflowY: "hidden",
            borderLeft: "1px solid #e0e0e0"
        }}>
            <Card
                style={{height: editorHeight, width: "100%"}}
                square={true}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Storyboard Notes:
                    </Typography>
                    <TextArea
                        style={{height: editorHeight}}
                        value={note}
                        onChange={onFieldTextChange}
                        placeholder="Key mechanics" bordered={false} />
                </CardContent>
            </Card>
            <Paper  style={{padding: "10px 10px", margin:"20px 0px"
            }} variant="outlined">
                <p style={{color:"grey", fontStyle:"italic"}}>
                    Rate from strongly disagree to strongly agree:
                </p>
                <li>I feel confident I can turn my storyboard ideas into <i>Snap!</i> code.</li>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeConfidence} value={confidenceRating}/>
                <li>I could apply some cool coding knowledge to make this!</li>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeKnowledge} value={knowledgeRating}/>
            </Paper>
        </div>
    )
}
export default connect(mapStateToProps)(NoteBox);
