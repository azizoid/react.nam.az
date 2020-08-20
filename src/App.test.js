import { shallow } from "enzyme";

import React from "react";
import App from "./App";

it("expect to render ayah component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
