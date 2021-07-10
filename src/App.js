import './App.less';
import React, { useContext, createContext, useState, useEffect } from "react";
import { hot } from 'react-hot-loader';
import ProjectDrawer from './components/Project/ProjectDrawer.jsx';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Dashboard from './components/Dashboard/Dashboard';
import { ProjectData } from './data/ProjectData';
import { useDispatch } from 'react-redux';
import { importProject } from './redux/features/projectSlice';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage'
import  {authContext, useAuth, ProvideAuth, useProvideAuth, PrivateRoute} from "./hooks/useAuth";
import Cookies from "js-cookie"
import globalConfig from "./globalConfig";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
});

const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const projectData = new ProjectData();
  //   projectData.addNewActor();
  //   projectData.addNewActor();
  //   projectData.addNewActor();
  //   const actorId = Object.keys(projectData.actorDataMap)[0];
  //   projectData.actorDataMap[actorId].addNewState();
  //   console.log('original project: ', projectData);
  //   const projectJSON = projectData.toString();
  //   console.log('projectJSON: ', projectJSON);
  //   // const projectStr = `{"uuid":"692e2ef2-b373-40cc-9b23-5257045e3f82","name":"Untitled","actorDataMap":{"7a157d32-dd8f-4457-badb-413f218e8c67":{"name":"Untitled","stateList":[{"uuid":"e6260162-cc33-4815-9150-c5055c91646f","name":"state"}]},"d76e0fe4-ec15-49bf-9a34-4d41a3f16a1d":{"name":"Untitled","stateList":[]},"e61b8429-3acf-4a1b-b451-18e3b972f862":{"name":"Untitled","stateList":[]}}}`;
  //   dispatch(importProject(projectJSON));
  // });

  return (
      <ProvideAuth>
      <Router>
        <ThemeProvider theme={theme}>
          <Route path={globalConfig.routes.login} children={<LoginPage/>} />
          <PrivateRoute path={globalConfig.routes.dashboard} children={<Dashboard />} />
          <Route exact path="/">
            <Redirect to={globalConfig.routes.dashboard} />
          </Route>
        </ThemeProvider>
      </Router>
      </ProvideAuth>
  );
};




// const authContext = createContext();


// {/*<ProjectDrawer/>;*/}
// {/*<DashboardPage/>*/}

export default hot(module)(App);
