import './App.less';
import React, { useContext, createContext, useState, useEffect } from "react";
import { hot } from 'react-hot-loader';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage'
import  {authContext, useAuth, ProvideAuth, useProvideAuth, PrivateRoute} from "./hooks/useAuth";
import globalConfig from "./globalConfig";

const theme = createTheme({
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

  return (
      <ProvideAuth>
      <Router basename={'/idea-builder'}>
        <ThemeProvider theme={theme}>
          <Route path={globalConfig.routes.login} children={<LoginPage/>} />
          <PrivateRoute path={globalConfig.routes.dashboard} children={<Dashboard />} />
          <Route exact path={`/`}>
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
