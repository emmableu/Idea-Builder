import {Dropdown, Menu} from "antd";
import {IconButton, makeStyles, Tooltip, withStyles} from "@material-ui/core";
import {Home, SaveAlt, InsertDriveFile, Visibility, Edit, CloudUpload} from "@material-ui/icons";
import { Switch } from 'antd';
import React from "react";
import {CopyOutlined, DeleteOutlined, DownloadOutlined, ImportOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {download} from "../../redux/features/projectSlice"
import {setViewMode} from "../../redux/features/modeSlice"
import { useRouteMatch, useHistory } from "react-router-dom"
import globalConfig from "../../globalConfig";
import ShareIcon from '@material-ui/icons/Share';
import ShareProjectButton from "./ShareProjectButton";
import UserButton from "../Dashboard/UserButton";
import Toolbar from "@material-ui/core/Toolbar";
import Cookies from "js-cookie";
import Box from "@material-ui/core/Box";
import { Modal } from 'antd';
import MergeUploadButton from "./MergeUploadButton";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles(theme => ({
    root: {
        width: 100,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
}))

const ProjectTitleBarActionGroup  = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const view = useSelector(state => state.mode.view);
    const permanentViewMode = useSelector(state => state.mode.permanentViewMode);
    const [isLoading, setIsLoading] = React.useState(false);

    const backToHome = () => {
        history.push(globalConfig.routes.dashboard);
    }
    const handleClick = () => {
        dispatch(download());
        setTimeout(() => {success()}, 1000);
    }

    const handleChange = (checked, event) => {
        if (permanentViewMode) {
            return;
        }
        setIsLoading(true)
        setTimeout(() => {
            dispatch(setViewMode(checked));
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }, 200)
    };

    function success() {
        Modal.success({
            title: 'Storyboard downloaded!',
            content: (
                <div>
                    <p>Tip: you may unzip the downloaded folder to reuse the assets in your Snap project.</p>
                </div>
            ),
            onOk() {},
        });
    }

    return (
        <div
            style={{width: 300,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
            }}
        >
            {
                !view &&
            <Box m={0.75}>
                <Tooltip title="Complete survey in a new tab">
                    <Button variant="contained" color="primary"  target="_blank" href="https://ncsu.qualtrics.com/jfe/form/SV_bNuNdZKlGzrNWGW">
                        Survey
                    </Button>
                </Tooltip>
            </Box>
            }
            <Box m={0.75}>
                <Switch loading={isLoading}
                        checked={view}
                        defaultChecked={true}
                        onChange={handleChange}
                        checkedChildren="View"
                        unCheckedChildren="Edit"
                        />
            </Box>
            <Box m={0.75}>
            <ShareProjectButton/>
            </Box>
            <Box m={0.75}>
            <Tooltip title="Save to computer">
                <IconButton
                    aria-label="files"
                    size="medium"
                    onClick={handleClick}
                    // disabled={view}
                >
                    <SaveAlt style={{color:
                            view?null:"white"}}/>
                </IconButton>
            </Tooltip>
            </Box>
            <Box m={0.75}>
                <MergeUploadButton
                    view={view}
                />
            </Box>

            {/*FileUploadIcon*/}
            <Box m={0.75}>
            <Tooltip title="Back to home">
                <IconButton
                    aria-label="display more actions"
                    color="inherit"
                    size="medium"
                    onClick={backToHome}>
                    <Home/>
                </IconButton>
            </Tooltip>
            </Box>
            <Box m={0.75}>
            <UserButton userId={Cookies.get("userId")}/>
            </Box>
        </div>
    )
};

export default ProjectTitleBarActionGroup;
