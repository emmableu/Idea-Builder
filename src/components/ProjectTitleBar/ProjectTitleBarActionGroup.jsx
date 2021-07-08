import {Dropdown, Menu} from "antd";
import {IconButton, Tooltip} from "@material-ui/core";
import {Home, SaveAlt, InsertDriveFile} from "@material-ui/icons";
import React from "react";
import {CopyOutlined, DeleteOutlined, DownloadOutlined, ImportOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {download} from "../../redux/features/projectSlice"
// import InsertDriveFile from "@material-ui/core/Icon";

// const actionMenu =
//     (
//         <Menu theme="dark"
//         >
//             <Menu.Item
//                 key="1">
//                 Load from computer</Menu.Item>
//             <Menu.Item
//                 key="2" >
//                 Save to computer
//             </Menu.Item>
//         </Menu>
//     );


const ProjectTitleBarActionGroup  = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(download());
    }
    return (
        <>
            <Tooltip title="Save to computer">
                <IconButton
                    aria-label="files"
                    size="medium"
                    onClick={handleClick}
                    >
                    <SaveAlt style={{color: "white"}}/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Back to home">
                <IconButton aria-label="display more actions" color="inherit" size="medium">
                    <Home/>
                </IconButton>
            </Tooltip>
        </>
    )
};

export default ProjectTitleBarActionGroup;
