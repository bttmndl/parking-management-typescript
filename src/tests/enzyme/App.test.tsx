import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Header from "../../components/Header";
import MainBody from "../../components/MainBody";
import ParkingSpaceSeat from "../../pages/ParkingSpaceSeat";
import ParkingExit from "../../pages/ParkingExit";
import App from "../../App";

describe("App component", () => {
  test("should render a header, main body, and routes", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(MainBody)).toHaveLength(0);
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
    expect(wrapper.find(ParkingSpaceSeat)).toHaveLength(0);
    expect(wrapper.find(ParkingExit)).toHaveLength(0);
  });
});
