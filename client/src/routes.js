import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Todos from "./components/pages/Todos/Todos";

const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/todos" component={Todos} />
    </Switch>
);

export default routes;
