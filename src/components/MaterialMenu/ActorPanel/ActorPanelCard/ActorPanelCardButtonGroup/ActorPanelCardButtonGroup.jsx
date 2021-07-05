import {Button, Tooltip} from "antd";
import {DeleteTwoTone, DragOutlined, SearchOutlined, UploadOutlined} from "@ant-design/icons";
import React from "react";
import DragHandleIcon from "../../../../primitives/DragHandleIcon";
import ActorPanelUploadButton from "./ActorPanelCardUploadButton/ActorPanelUploadButton";

const ActorPanelCardButtonGroup = (props) => {
    return (
        <>
            <ActorPanelUploadButton/>
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
