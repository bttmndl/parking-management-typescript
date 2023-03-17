import React from "react";
import { shallow } from "enzyme";
import {
  useSelector as useSelectorOrig,
  useDispatch as useDispatchOrig,
} from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ParkingExit from "../../pages/ParkingExit";
import { deAllocate } from "../../redux/actionType";



jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("ParkingExit", () => {
  const mockState = {
    seatCapacity: 10,
    seatAvailability: 8,
    parkingSeat: [
      {
        parkId: 1,
        vechicleNo: "ABC123",
        date: "2022-01-01",
        time: "12:00",
      },
    ],
  };

  let useDispatch:any;
  let useSelector:any;

  beforeEach(() => {
    useDispatch = useDispatchOrig as jest.Mock;
    useSelector = useSelectorOrig as jest.Mock;
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selector:any) => selector(mockState));
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  test("should render without errors", () => {
    const component = shallow(<ParkingExit />);
    const wrapper = component.find(".main-parking-exit");
    expect(wrapper.length).toBe(1);
  });

  test("should display the vehicle number", () => {
    const component = shallow(<ParkingExit />);
    const vehicleNo = component.find("h1 span");
    expect(vehicleNo.text()).toBe(mockState.parkingSeat[0].vechicleNo);
  });

  test("should call the deAllocate action and navigate to parkingSpaceSeat on payment", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const navigate = jest.fn();
    const component = shallow(<ParkingExit />);
    const payButton = component.find("button");
    payButton.simulate("click");
    expect(dispatch).toHaveBeenCalledWith(deAllocate(0));
    expect(navigate).toHaveBeenCalledWith("/parkingSpaceSeat");
  });
});

