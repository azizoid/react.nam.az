import { shallow } from "enzyme";

import React from "react";
import PrayerList from "../components/prayerlist.component";

it("expect to render ayah component", () => {
  const mock = [
    { id: 1, title: "Fəcr namazı", time: "--:--", rakat: 2 },
    { id: 2, title: "Günəş", time: "-:-", rakat: 0 },
    { id: 3, title: "Zöhr namazı", time: "-:-", rakat: 4 },
    { id: 4, title: "Əsr namazı", time: "-:-", rakat: 4 },
    { id: 5, title: "Məğrib namazı", time: "-:-", rakat: 3 },
    { id: 6, title: "İşa namazı", time: "-:-", rakat: 4 },
  ];
  const wrapper = shallow(<PrayerList prayers={mock} currentPrayer="2" />);
  expect(wrapper).toMatchSnapshot();
});
