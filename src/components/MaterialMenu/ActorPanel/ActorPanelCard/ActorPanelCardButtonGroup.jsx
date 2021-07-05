import {Button, Tooltip} from "antd";
import {DeleteTwoTone, DragOutlined, SearchOutlined, UploadOutlined} from "@ant-design/icons";
import React from "react";
import DragHandleIcon from "../../../primitives/DragHandleIcon";

const ActorPanelCardButtonGroup = (props) => {
    return (
        <>
            <input
                accept="image/*"
                id="contained-button-file"
                style={{display: "none"}}
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Tooltip title="Upload state">
                    <Button
                        type="link"
                        shape="circle"
                        icon={<UploadOutlined />}
                    >
                    </Button>
                </Tooltip>
            </label>
            <Tooltip title="Search for state">
                <Button
                    type="link"
                    shape="circle"
                    icon={<SearchOutlined />} />
            </Tooltip>
            <Button
                {...props}
                type="link"
                shape="circle"
                icon={<DragHandleIcon
                />} />

            <Tooltip title="Delete actor">
                <Button
                    type="link"
                    shape="circle"
                    icon={<DeleteTwoTone
                        twoToneColor="#eb2f96"
                    />}
                >
                </Button>
            </Tooltip>

        </>
    )
}

export default ActorPanelCardButtonGroup;
