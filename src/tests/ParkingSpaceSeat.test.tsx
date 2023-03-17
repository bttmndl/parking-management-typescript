import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ParkingSpaceSeat from '../pages/ParkingSpaceSeat';
import store from '../redux';
import { parkCar } from '../redux/actionType';

describe('ParkingSpaceSeat component', () => {
    test('should render parking spaces with seatCapacity as 5', () => {
        render(
            <Provider store={store}>
            <BrowserRouter>
            <ParkingSpaceSeat />
            </BrowserRouter>
            </Provider>
        );
        const parkingSpaces = screen.getAllByTestId('parking-seat');
        expect(parkingSpaces.length).toBe(5);
    });

    test('should book a parking space with vehicle details', () => {
        const { getByPlaceholderText, getByText } = render(
        <Provider store={store}>
            <BrowserRouter>
                <ParkingSpaceSeat />
            </BrowserRouter>
        </Provider>
        );
        const vehicleNoInput = getByPlaceholderText('Enter Vehicle Details...');
        fireEvent.change(vehicleNoInput, { target: { value: 'KL 01 AB 1234' } });
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
        const parkingSpace = store.getState().parkingSeat[0];
        expect(parkingSpace.vechicleNo).toBe('KL 01 AB 1234');
    });

    test('should show error message when parking is full', () => {
        store.dispatch(parkCar({ parkId: 0, vechicleNo: 'KL 01 AB 1234', date: '', time: '' }));
        store.dispatch(parkCar({ parkId: 1, vechicleNo: 'KL 01 AB 5678', date: '', time: '' }));
        store.dispatch(parkCar({ parkId: 2, vechicleNo: 'KL 01 AB 9012', date: '', time: '' }));
        store.dispatch(parkCar({ parkId: 3, vechicleNo: 'KL 01 AB 3456', date: '', time: '' }));
        store.dispatch(parkCar({ parkId: 4, vechicleNo: 'KL 01 AB 7890', date: '', time: '' }));

        const { getByPlaceholderText, getByText } = render(
        <Provider store={store}>
            <BrowserRouter>
            <ParkingSpaceSeat />
            </BrowserRouter>
        </Provider>
        );
        const vehicleNoInput = getByPlaceholderText('Enter Vehicle Details...');
        fireEvent.change(vehicleNoInput, { target: { value: 'KL 01 AB 1234' } });
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
        const popupMessage = screen.getByText('Sorry! Parking is full');
        expect(popupMessage).toBeInTheDocument();
    });
});