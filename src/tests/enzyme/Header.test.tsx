import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

describe("Header component", () => {
  test("renders the correct text", () => {
    const wrapper = shallow(<Header />);
    const headerText = wrapper.find("h1").text();
    expect(headerText).toEqual("Parking Management");
  });

  test("has a pointer cursor style", () => {
    const wrapper = shallow(<Header />);
    const headerStyle = wrapper.find("h1").prop("style");
    expect(headerStyle).toHaveProperty("cursor", "pointer");
  });
});
