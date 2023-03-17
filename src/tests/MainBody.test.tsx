import { createStore } from 'redux';
import { render, screen, fireEvent } from "@testing-library/react";
import actionReducer from '../redux/actionReducer';
import { seatCapacity } from '../redux/actionType';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MainBody from "../components/MainBody";

describe('actionReducer', () => {
  let store:any;

  beforeEach(() => {
    store = createStore(actionReducer);
  });

  test('should update seat capacity', () => {
    expect(store.getState().seatCapacity).toBe(0);
    store.dispatch(seatCapacity(5));
    expect(store.getState().seatCapacity).toBe(5);
    store.dispatch(seatCapacity(10));
    expect(store.getState().seatCapacity).toBe(10);
  });

  test("renders input box and button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainBody />
        </BrowserRouter>
      </Provider>
    );
    const inputBox = screen.getByPlaceholderText(
      "Please Enter No of Vehicle Spaces you need..."
    );
    expect(inputBox).toBeInTheDocument();
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  test("navigates to parkingSpaceSeat on button click", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MainBody />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);
    expect(container.innerHTML).toContain("input_box");
    expect(container.innerHTML).toContain("input_button");
  });

});
