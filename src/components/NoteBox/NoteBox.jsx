import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useEffect} from "react";
import globalConfig, {calcFrameWidth} from "../../globalConfig";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import {ProjectAPI} from "../../api/ProjectAPI";
import {useDispatch, useSelector} from "react-redux";
import {saveNote} from "../../redux/features/projectSlice";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

// const calcBoxHeight = (windowInnerHeight) => {
//     return windowInnerHeight
//         - globalConfig.toolBarHeight
//         - globalConfig.storyboardToolBarHeight
//         - globalConfig.storyboardPageMargin*2
// }







export default function NoteBox() {
    const [value, setValue] = React.useState("**Enter your notes here:**");
    const [selectedTab, setSelectedTab] = React.useState("write");
    const dispatch = useDispatch();

    const project = useSelector(state => state.project.value)
    const selectedStoryboardId = useSelector(state => state.project.value === null?"UNDEFINED":state.project.value.selectedId.storyboardId);


    React.useEffect(
        () => {
            if (selectedStoryboardId === "UNDEFINED"|| selectedStoryboardId === null) {
                return;
            }
            else {
                try {
                    const loadedNote = project.getStoryboard(selectedStoryboardId).note;
                    setValue(loadedNote)
                }
                catch (error) {
                    console.log("error in loading note: ", error);
                }
            }
        },

        [selectedStoryboardId])

    const saveNoteDebounce = AwesomeDebouncePromise(
        text => dispatch(saveNote(text)),
        500);

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

