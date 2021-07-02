import './App.less';
import React from 'react';
import { hot } from 'react-hot-loader';
import BoardDrawer from "./components/Board/BoardDrawer.jsx";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

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
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


const App = () => {
  return (
  <ThemeProvider theme={theme}>
  <div><BoardDrawer/></div>;
  </ThemeProvider>)
};



export default hot(module)(App);
