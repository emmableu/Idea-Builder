import { Input } from 'antd';
import Paper from "@material-ui/core/Paper";
import globalConfig from "../../globalConfig";
import {createSelector} from "reselect";
import * as React from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import {saveNote} from "../../redux/features/projectSlice";
import {useDispatch, connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
const { TextArea } = Input;

const calcBoxHeight = (windowInnerHeight) => {
    return windowInnerHeight
        - globalConfig.toolBarHeight
        - globalConfig.storyboardToolBarHeight
        - globalConfig.storyboardPageMargin*2 - 30
}
const getStoryboardNoteData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    (storyboardId, storyboardList) => {
        if (storyboardId === null) {
            return {
                storyboardId: null,
                note: ""
            }
        }
        return {
            storyboardId: storyboardId,
            note: storyboardList.find(s => s._id === storyboardId).note
        }
    }
);

const mapStateToProps = (state) => {
    return getStoryboardNoteData(state)
};


const NoteBox = (props) => {
    const {storyboardId, note} = props;
    const [value, setValue] = React.useState(note);
    const dispatch = useDispatch();
    const editorHeight = calcBoxHeight(window.innerHeight);

    React.useEffect(() => {
        setValue(note)
    }, [note, storyboardId]);


    const saveNoteDebounce = AwesomeDebouncePromise(
        text => dispatch(saveNote(text)),
        1000);

    const onFieldTextChange = async (e) => {
        const text = e.target.value
        setValue(text);
        await saveNoteDebounce(text);
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
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Storyboard Notes:
                    </Typography>
                    <TextArea
                        style={{height: editorHeight}}
                        value={value}
                        onChange={text => onFieldTextChange(text)}
                        placeholder="Key mechanics" bordered={false} />
                </CardContent>
            </Card>
        </div>
    )
}
export default connect(mapStateToProps)(NoteBox);
