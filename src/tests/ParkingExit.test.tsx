import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import ParkingExit from "../pages/ParkingExit";
import { deAllocate } from "../redux/actionType";

describe("ParkingExit component", () => {
  const mockStore = configureStore([]);
  let store:any;
  let index:number;
  let parkingSeat:any;

  beforeEach(() => {
    index = 1;
    parkingSeat = [
      { parkId: 1, vechicleNo: "ABC123", date: "2022-03-10", time: "10:00" },
      { parkId: 2, vechicleNo: "DEF456", date: "2022-03-10", time: "11:00" },
      { parkId: 3, vechicleNo: "GHI789", date: "2022-03-10", time: "12:00" },
    ];
    store = mockStore({
      seatCapacity: 10,
      seatAvailability: 8,
      parkingSeat: parkingSeat,
    });
  });

  test("renders vehicle number, total time and charges", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ParkingExit />
        </BrowserRouter>
      </Provider>
    );
    const vehicleNo = screen.getByText("Vehicle NO:");
    const totalTime = screen.getByText("Total Time:");
    const totalCharges = screen.getByText(/Total Charges : \$-?\d+/);

    expect(vehicleNo).toBeInTheDocument();
    expect(totalTime).toBeInTheDocument();
    expect(totalCharges).toBeInTheDocument();
  });

  test("dispatches deAllocate action and navigates to parkingSpaceSeat on payment button click", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ParkingExit />
        </BrowserRouter>
      </Provider>
    );
    const paymentButton = screen.getByRole("button", { name: "PAY" });
    fireEvent.click(paymentButton);
    const actions = store.getActions();
    expect(actions).toEqual([deAllocate(index)]);
    expect(window.location.pathname).toEqual("/parkingSpaceSeat");
  });
});
