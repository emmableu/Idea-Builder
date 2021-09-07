import React from "react";
import {Input, Modal} from "antd";

const NewStoryboardNameInput = (props) => {
    const {setNewStoryboardName} = props;
    return (
        <div
            style={{flexGrow: 1, display: "flex",
                    justifyContent: "center", alignItems: "center",
            }}
        >
            <Input
                onChange={e => setNewStoryboardName(e.target.value)}
                placeholder="Storyboard Name"
            />
        </div>

    )
}

export default NewStoryboardNameInput
