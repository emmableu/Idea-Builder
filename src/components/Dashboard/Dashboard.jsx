import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DashboardTitleBar from "./DashboardTitleBar";
import ProjectDrawer from "./ProjectDrawer";
import {useParams} from "react-router-dom";

const Dashboard = () => {
    let {userID} = useParams();
    return (
        <React.Fragment>
                <ProjectDrawer userID={userID}/>
        </React.Fragment>
    );
}


export default Dashboard;
