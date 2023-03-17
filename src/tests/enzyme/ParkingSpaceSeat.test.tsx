import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import ParkingSpaceSeat from "../../pages/ParkingSpaceSeat";
import actionReducer from "../../redux/actionReducer";

describe("ParkingSpaceSeat component", () => {
  let wrapper:any;
  const store = createStore(actionReducer);

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <ParkingSpaceSeat />
        </MemoryRouter>
      </Provider>
    ).dive();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("should update the vehicle number when input is changed", () => {
    const wrapper = shallow(<ParkingSpaceSeat />);
    const input = wrapper.find(".input");
    input.simulate("change", { target: { value: "AB1234" } });
    expect(wrapper.state("currentVehice").vechicleNo).toEqual("AB1234");
  });

  test("should render parking seats", () => {
    expect(wrapper.find(".parking-seat").length).toEqual(
      store.getState().seatCapacity
    );
  });

  test("should show popup box when parking is full", () => {
    store.dispatch({
      type: "SET_SEAT_AVAILABILITY",
      payload: Array(store.getState().seatCapacity).fill(false),
    });
    wrapper.update();
    wrapper.find(".button").simulate("click");
    expect(wrapper.find(".popup-box-container").exists()).toBe(true);
  });

  test("should book a seat", () => {
    wrapper.find(".parking-seat").at(0).simulate("click");
    wrapper.find(".input").simulate("change", { target: { value: "ABC123" } });
    wrapper
      .find(".date-picker")
      .simulate("change", { target: { value: "2023-03-13" } });
    wrapper
      .find(".time-picker")
      .simulate("change", { target: { value: "13:00" } });
    wrapper.find(".button").simulate("click");
    expect(store.getState().parkingSeat.length).toBe(1);
  });

  test("should de-allocate a seat", () => {
    store.dispatch({
      type: "PARK_CAR",
      payload: {
        parkId: 0,
        vechicleNo: "ABC123",
        date: "2023-03-13",
        time: "13:00",
      },
    });
    wrapper.update();
    wrapper.find(".parking-seat").at(0).simulate("click");
    expect(store.getState().parkingSeat.length).toBe(0);
  });
});
