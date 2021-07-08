import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import IdeaBuilderIcon from "../primitives/IdeaBuilderIcon";
import {UserOutlined} from "@ant-design/icons";
import globalConfig from "../../globalConfig";

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
    const {userID} = props;
    const classes = useStyles();

    return (
            <AppBar className={classes.appBar}
                    position="fixed"
                    color="inherit"
                    >
                <Toolbar>
                        <Button color="inherit" startIcon={<IdeaBuilderIcon />}>
                            Idea Builder
                        </Button>

                <Typography variant="h6" className={classes.title}>
                </Typography>
                    <Button color="inherit"  startIcon={<UserOutlined />}>{userID}</Button>
                </Toolbar>
            </AppBar>
    );
}

export default DashboardTitleBar;
