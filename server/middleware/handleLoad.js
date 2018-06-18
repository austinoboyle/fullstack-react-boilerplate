import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { createStore } from "redux";

import reducers from "../client/src/reducers";
import App from "../client/src/App";

const handleLoad = (req, res) => {
    try {
        let context = {};
        const store = createStore(reducers);
        const app = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        const component = renderToString(app);
        res.render("index", { component });
    } catch (e) {
        console.error("ERROR", e);
    }
};

export default handleLoad;
