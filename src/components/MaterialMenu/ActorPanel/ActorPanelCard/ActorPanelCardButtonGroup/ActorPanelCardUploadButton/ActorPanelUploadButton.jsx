import React from "react";
import {Button, Tooltip} from 'antd';
import {PoweroffOutlined, UploadOutlined} from '@ant-design/icons';

const ActorPanelUploadButton = () => {
    const [loading, setLoading] = React.useState(false);


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
                        loading={loading}
                    >
                    </Button>
                </Tooltip>
            </label>

        </>
    );
}

export default ActorPanelUploadButton;
