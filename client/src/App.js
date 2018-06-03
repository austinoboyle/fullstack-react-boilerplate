import React, { Component } from "react";
import routes from "./routes";

class App extends Component {
    render() {
        return <div className="app-wrapper">{routes}</div>;
    }
}

export default App;
