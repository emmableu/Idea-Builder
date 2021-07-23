import {Dropdown, Menu} from "antd";
import {IconButton, Tooltip} from "@material-ui/core";
import {Home, SaveAlt, InsertDriveFile, Visibility, Edit} from "@material-ui/icons";
import React from "react";
import {CopyOutlined, DeleteOutlined, DownloadOutlined, ImportOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {download, setMode} from "../../redux/features/projectSlice"
import { useRouteMatch, useHistory } from "react-router-dom"
import globalConfig from "../../globalConfig";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const ProjectTitleBarActionGroup  = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const mode = useSelector(state => state.project.value.mode);

    const backToHome = () => {
        history.push(globalConfig.routes.dashboard);
    }
    const handleClick = () => {
        dispatch(download());
    }
    const handleChange = (event) => {
        setMode(event.target.value);
    };

    return (
        <>
            {/*{<Tooltip title="Change to view mode">*/}
            {/*    <IconButton*/}
            {/*        aria-label="view"*/}
            {/*        size="medium"*/}
            {/*        onClick={dispatch(setMode("view"))}*/}
            {/*        >*/}
            {/*        */}
            {/*    </IconButton>*/}
            {/*</Tooltip>}*/}

            <FormControl>
                <InputLabel id="demo-simple-select-label">

                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mode}
                    onChange={handleChange}
                >
                    <MenuItem value={"view"}><Visibility style={{color: "white"}} /></MenuItem>
                    <MenuItem value={"edit"}><Edit style={{color: "white"}} /></MenuItem>
                </Select>
            </FormControl>

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
                <IconButton
                    aria-label="display more actions"
                    color="inherit"
                    size="medium"
                    onClick={backToHome}>
                    <Home/>
                </IconButton>
            </Tooltip>
        </>
    )
};

export default ProjectTitleBarActionGroup;
