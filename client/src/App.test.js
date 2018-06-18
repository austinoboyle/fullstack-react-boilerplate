import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("Renders", () => {
    const app = shallow(<App />);
    expect(app.find(".app-wrapper").length).toBe(1);
    expect(app.find("div").length).toBeGreaterThan(1);
});
