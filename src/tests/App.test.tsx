import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ParkingSpaceSeat from "../pages/ParkingSpaceSeat";

const mockStore = configureStore([]);

describe("App component", () => {
  let store:any;

  beforeEach(() => {
    store = mockStore({
      
    });
  });

  test("renders header", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders main body", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const mainBodyElement = screen.getByTestId("main-body");
    expect(mainBodyElement).toBeInTheDocument();
  });

  test("renders parking space seat", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/parkingSpaceSeat" element={<ParkingSpaceSeat />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    const parkingSpaceSeatElement = screen.getByTestId("parking-space-seat");
    expect(parkingSpaceSeatElement).toBeInTheDocument();
  });

  test("renders parking exit", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/parkingSpaceSeat/:id" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    const parkingExitElement = screen.getByTestId("parking-exit");
    expect(parkingExitElement).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
