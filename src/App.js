import './App.less';
import React from 'react';
import { hot } from 'react-hot-loader';
import BoardDrawer from "./components/Board/BoardDrawer.jsx";



const App = () => {
  return <div><BoardDrawer/></div>;
};



export default hot(module)(App);
