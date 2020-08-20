import { shallow } from "enzyme";

import React from "react";
import Ayah from "../components/ayah.component";

it("expect to render ayah component", () => {
  const wrapper = shallow(<Ayah />);
  expect(wrapper).toMatchSnapshot();
});
