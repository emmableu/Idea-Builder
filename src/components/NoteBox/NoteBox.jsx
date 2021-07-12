import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useEffect} from "react";
import globalConfig, {calcFrameWidth} from "../../globalConfig";

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
}

export default function NoteBox() {
    const [value, setValue] = React.useState("**Enter your notes here:**");
    const [selectedTab, setSelectedTab] = React.useState("write");

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
                onChange={setValue}
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

