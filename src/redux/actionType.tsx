interface vehicledetails {
  parkId: number;
  vechicleNo: string;
  date: string;
  time: string;
}

export const seatBooking = (parkIndex: number) => ({
  type: "BOOK_SEAT",
  payload: parkIndex,
});

export const seatCapacity = (capacity: number) => ({
  type: "SEAT_CAPACITY",
  payload: capacity,
});

export const parkCar = (vehicleDetail: vehicledetails) => ({
  type: "PARK_CAR",
  payload: vehicleDetail,
});

export const deAllocate = (deallocateIndex: number) => ({
  type: "DEALLOCATE",
  payload: deallocateIndex,
});
