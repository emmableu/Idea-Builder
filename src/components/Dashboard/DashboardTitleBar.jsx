import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {IdeaBuilderIcon} from "../primitives/Icon/Icon";
import {UserOutlined} from "@ant-design/icons";
import globalConfig from "../../globalConfig";
import UserButton from "./UserButton";
import {useSelector} from "react-redux";
import Cookies from "js-cookie"

const drawerWidth = globalConfig.projectDrawerWidth;
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor:"inherit",
    },
}));

export const DashboardTitleBar = (props) => {
    const {userId} = props;
    const classes = useStyles();
    // // // globalLog("Cookies.get(userid", Cookies.get("userId"));
    // const userId = useSelector(state =>
    //     state.dashboard.value===null? null:state.dashboard.value.userId);
    //
    // React.useEffect(() => {
    //     // // globalLog("state.dashboard.value: ", userId);
    // }, [userId])

    return (
            <AppBar className={classes.appBar}
                    position="fixed"
                    color="inherit"
                    elevation={3}
                    >
                <Toolbar>
                        <Button color="inherit" startIcon={<IdeaBuilderIcon />}>
                            CSC110 Project 1 (North Carolina State University)
                        </Button>

                <Typography variant="h6" className={classes.title}>
                </Typography>
                    <UserButton userId={userId}/>
                </Toolbar>
            </AppBar>
    );
}

export default DashboardTitleBar;
