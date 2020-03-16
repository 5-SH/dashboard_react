import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.jsx";
import RTLLayout from "layouts/RTL/RTL.jsx";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import App from './App';

ReactDOM.render(
  <App />
  , document.getElementById("root")
);
