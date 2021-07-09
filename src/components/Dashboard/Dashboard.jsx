import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DashboardTitleBar from "./DashboardTitleBar";
import ProjectDrawer from "./ProjectDrawer";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchDashboardByUserID} from "../../redux/features/dashboardSlice";
import Cookies from "js-cookie"

const Dashboard = () => {
    const dispatch = useDispatch();

    React.useEffect(() =>
    {
        if (Cookies.get('userID') !== undefined) {
            dispatch(fetchDashboardByUserID(Cookies.get('userID')));
        }
    }, [])


    return (
        <>
            <ProjectDrawer />
        </>
    );
}


export default Dashboard;
