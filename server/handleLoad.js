import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { createStore } from "redux";

import reducers from "../client/src/reducers";
import App from "../client/src/App";

const handleLoad = (req, res) => {
    console.log("CALLING HANDELOAD FOR:", req.url);
    let context = {};
    let initialState = {};
    const store = createStore(reducers, initialState);
    const app = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    const component = renderToString(app);
    res.render("index", { component });
};

export default handleLoad;
