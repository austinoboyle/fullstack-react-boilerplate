import React, { Component } from "react";
import routes from "./routes";
import Header from "./components/layout/Header/Header";

class App extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <div className="header">
                    <Header />
                </div>
                {routes}
            </div>
        );
    }
}

export default App;
