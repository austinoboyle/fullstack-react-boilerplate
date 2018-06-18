import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import TodoApp from "./components/TodoApp/TodoApp";

const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/todos" component={TodoApp} />
    </Switch>
);

export default routes;
