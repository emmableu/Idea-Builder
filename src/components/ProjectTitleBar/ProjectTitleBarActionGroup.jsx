import {Dropdown, Menu} from "antd";
import {IconButton, makeStyles, Tooltip, withStyles} from "@material-ui/core";
import {Home, SaveAlt, InsertDriveFile, Visibility, Edit} from "@material-ui/icons";
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



const useStyles = makeStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: globalConfig.storyboardMenuColor.titleBar.background,
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: globalConfig.storyboardMenuColor.titleBar.background,
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
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
    }

    const handleShare = () => {
        console.log("share")
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

    return (
        <>
            <Switch loading={isLoading}
                    checked={view}
                    defaultChecked={true}
                    onChange={handleChange}
                    checkedChildren="View"
                    unCheckedChildren="Edit"
                    />


            <ShareProjectButton/>


            <Tooltip title="Save to computer">
                <IconButton
                    aria-label="files"
                    size="medium"
                    onClick={handleClick}
                    disabled={view}
                >
                    <SaveAlt style={{color:
                            view?null:"white"}}/>
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
