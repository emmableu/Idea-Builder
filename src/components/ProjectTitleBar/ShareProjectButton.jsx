import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {IconButton, Tooltip} from "@material-ui/core";
import ShareIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ShareTagsInput from "./ShareTagsInput";
import {Share} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {shareProject} from "../../redux/features/projectSlice";


const ShareProjectButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const authorIdList = useSelector(state => state.project.value.authorIdList);
    const tagsData = [...authorIdList]
    const idx = tagsData.findIndex(t => t === Cookies.get("userId"))
    tagsData.splice(idx, 1);


    const dispatch = useDispatch();
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [tags, setTags] = React.useState(tagsData)



    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        const newAuthorList = tags.concat([Cookies.get("userId")])
        newAuthorList.sort();
        await dispatch(shareProject({authorIdList: newAuthorList}));
        console.log("newAuthorList: ", newAuthorList);
        setConfirmLoading(false);
        setIsModalVisible(false);
        success();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setTags(tagsData);
    };

    const successConfig = {
        title: 'Project sharing success!',
        content: (
            <>
                <p>
                    {`Only your team member can edit the project using the URL link of this page.\n
                    They should also see the project in their own dashboard after reloading.`}
                </p>
            </>
        ),
    };


    const success = () => {
        Modal.success(successConfig);
    }

    return (
        <>
            <Tooltip title="Share">
                <IconButton
                    aria-label="files"
                    size="medium"
                    onClick={showModal}
                    // disabled={view}
                >
                    <Share
                        style={{color: "white"}}
                    />
                </IconButton>
            </Tooltip>
            <Modal title="Share project"
                   visible={isModalVisible}
                   confirmLoading={confirmLoading}
                   onOk={handleOk}
                   onCancel={handleCancel}>
                <p>Anyone with the URL link of this page can view your project.</p>
                <p>To give your project team member edit access, enter their unity ID below: </p>
                <ShareTagsInput
                    tags={tags}
                    setTags={setTags}
                />
            </Modal>
        </>
    );
};
export default ShareProjectButton
