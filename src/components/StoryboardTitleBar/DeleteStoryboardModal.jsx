import React, { useState } from 'react';
// import { Modal, Button, Space } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
//
// const { confirm } = Modal;
// const showDeleteConfirm = () => {
//     confirm({
//         title: 'Are you sure delete this task?',
//         icon: <ExclamationCircleOutlined />,
//         content: 'Some descriptions',
//         okText: 'Yes',
//         okType: 'danger',
//         cancelText: 'No',
//         onOk() {
//             // // globalLog('OK');
//         },
//         onCancel() {
//             // // globalLog('Cancel');
//         },
//     });
// }

const DeleteStoryboardButton = (props) => {
    const {isModalVisible, setIsModalVisible} = props;

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default DeleteStoryboardButton;
