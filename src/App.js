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

  return (
      <ProvideAuth>
      <Router  basename={`${process.env.PUBLIC_URL}/`}>
        <ThemeProvider theme={theme}>
          <Route path={`${process.env.PUBLIC_URL}/${globalConfig.routes.login}`} children={<LoginPage/>} />
          <PrivateRoute path={`${process.env.PUBLIC_URL}/${globalConfig.routes.dashboard}`} children={<Dashboard />} />
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <Redirect to={`${process.env.PUBLIC_URL}/${globalConfig.routes.dashboard}`} />
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
