import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {IconButton, Tooltip} from "@material-ui/core";
import ShareIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ShareTagsInput from "./ShareTagsInput";



const ShareProjectButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Tooltip title="Share">
                <IconButton
                    aria-label="files"
                    size="medium"
                    onClick={showModal}
                    // disabled={view}
                >
                    <ShareIcon
                    />
                </IconButton>
            </Tooltip>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {/*<p>Some contents...</p>*/}
                {/*<p>Some contents...</p>*/}
                {/*<p>Some contents...</p>*/}
                <ShareTagsInput/>
            </Modal>
        </>
    );
};
export default ShareProjectButton
