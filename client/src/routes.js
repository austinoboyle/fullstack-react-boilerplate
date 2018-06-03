import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";

const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
    </Switch>
);

export default routes;
