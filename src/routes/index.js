import React from "react";
import { Switch } from "react-router-dom";

import history from "../services/history";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";
import MyRoute from "./MyRoute";

export default function Routes() {
    // history.push('/')
    return (
        <Switch>
            <MyRoute exact path='/' component={Login} />
            <MyRoute component={Page404} />
        </Switch>
    )
}