import React, { Fragment, useState } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import "assets/scss/black-dashboard-react.scss";
import "assets/css/nucleo-icons.css";

import AdminLayout from "./Admin.jsx";


function App() {
  const [fadeIn, setFadeIn] = useState(true);
  const toggle = () => setFadeIn(!fadeIn);
  const hist = createBrowserHistory();

  return (
    <Fragment>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/map" />
        </Switch>
      </Router> 
    </Fragment>
  );
}

export default App;
