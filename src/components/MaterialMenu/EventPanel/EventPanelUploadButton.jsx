// import React from 'react';
// import { Upload, message, Button, Tooltip } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from "../../../axiosConfig"
// import {useDispatch} from "react-redux";
// import {addEvent} from "../../../redux/features/projectSlice";
//
// const uploadButtonProps = {
//     name: 'file',
//     headers: {
//         authorization: 'authorization-text'
//     },
//     showUploadList: false,
//     accept:"image/*",
// };
//
// const EventPanelUploadButton = (props) => {
//     const dispatch = useDispatch();
//
//     const uploadImage = async options => {
//         const { file } = options;
//
//         const fmData = new FormData();
//         const config = {
//             headers: { 'content-type': 'multipart/form-data' },
//         };
//         fmData.append('file', file);
//         axios({
//             method: "post",
//             url: "/event/upload",
//             data: fmData,
//             config
//         }).then(response => {
//             dispatch(addEvent(response.data._id));
//                 })
//         };
//
//
//     return (
//         <>
//             <Upload
//                 customRequest={uploadImage}
//                 {...uploadButtonProps}>
//                 <Tooltip title="Upload">
//                     <Button type="link" shape="circle"  size="large" icon={<UploadOutlined />} />
//                 </Tooltip>
//             </Upload>
//         </>
//     );
// };
//
// export default EventPanelUploadButton;
