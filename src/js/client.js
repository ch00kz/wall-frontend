import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { createHashHistory } from 'history';

import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from './components/Register';
import Wall from './components/Wall';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Wall}></IndexRoute>
      <Route path="login" component={Login}></Route>
      <Route path="register" component={Register}></Route>
    </Route>
  </Router>,
app);