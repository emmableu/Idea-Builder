import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useEffect} from "react";
import globalConfig, {calcFrameWidth} from "../../globalConfig";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import {ProjectAPI} from "../../api/ProjectAPI";
import {useDispatch, connect} from "react-redux";
import {saveNote} from "../../redux/features/projectSlice";
import {ProjectDataHandler} from "../../data/ProjectData";
import {createSelector} from "reselect";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const calcBoxHeight = (windowInnerHeight) => {
    return windowInnerHeight
        - globalConfig.toolBarHeight
        - globalConfig.storyboardToolBarHeight
        - globalConfig.storyboardPageMargin*2
        - 200
}


const getStoryboardNoteData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    (storyboardId, storyboardList) => ({
        storyboardId: storyboardId,
        note: storyboardList.find(s => s._id === storyboardId).note
    })
);

const mapStateToProps = (state) => {
    return getStoryboardNoteData(state)
};

const NoteBox = (props) => {
    const {storyboardId, note} = props;
    const [value, setValue] = React.useState(note);
    const [selectedTab, setSelectedTab] = React.useState("write");
    const dispatch = useDispatch();
    const editorHeight = calcBoxHeight(window.innerHeight);

    React.useEffect(() => {
        setValue(note)
    }, [note]);


    const saveNoteDebounce = AwesomeDebouncePromise(
        text => dispatch(saveNote(text)),
        5000);

    const onFieldTextChange = async (text) => {
        setValue(text);
        await saveNoteDebounce(text);
    };

    return (
        <div style={{  width: "100%",
            height: "100%",
            backgroundColor: globalConfig.color.veryLightGrey,
            padding: "10px 10px",
            overflowY: "hidden",
            borderLeft: "1px solid #e0e0e0"
        }}>
            <ReactMde
                value={value}
                minEditorHeight={editorHeight}
                onChange={text => onFieldTextChange(text)}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    }
                }}
                paste={null}
            />
        </div>
    );
}

export default connect(mapStateToProps)(NoteBox);

