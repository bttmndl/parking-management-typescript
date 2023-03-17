import React from "react";
import { shallow } from "enzyme";
import { useDispatch, useSelector } from "react-redux";
import { seatCapacity } from "../../redux/actionType";
import { useNavigate } from "react-router-dom";
import MainBody from "../../components/MainBody";

jest.mock("react-redux");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("MainBody component", () => {
  let dispatchMock:any;
  let navigateMock:any;
  let useSelectorMock:any;

  beforeEach(() => {
    dispatchMock = jest.fn();
    navigateMock = jest.fn();
    useSelectorMock = useSelector as jest.MockedFunction<typeof useSelector>;
    useSelector.mockImplementation((selector:any) =>
      selector({
        // Set up mocked state
      })
    );
    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    useSelectorMock.mockReset();
  });

  test("dispatches seatCapacity action on input change", () => {
    const wrapper = shallow(<MainBody />);
    const input = wrapper.find(".input_box");
    input.simulate("change", { target: { value: "5" } });
    expect(dispatchMock).toHaveBeenCalledWith(seatCapacity(5));
  });

  test("calls navigate on button click", () => {
    const wrapper = shallow(<MainBody />);
    const button = wrapper.find(".input_button");
    button.simulate("click");
    expect(navigateMock).toHaveBeenCalledWith("/parkingSpaceSeat");
  });
});
