interface parkingSeatStruc {
  parkId: number,
  vechicleNo: string,
  date: string,
  time: string,
}

interface ParkingState {
  seatCapacity: number;
  seatAvailability: boolean[];
  parkingSeat: parkingSeatStruc[],
}

const INITIAL_STATE: ParkingState = {
  seatCapacity: 0,
  seatAvailability: [],
  parkingSeat: [],
};

const actionReducer = (state = INITIAL_STATE,action: { type: string; payload?: any }): ParkingState => {
  switch (action.type) {
    case "SEAT_CAPACITY":
      return {
        ...state,
        seatCapacity: action.payload,
        seatAvailability: Array(action.payload).fill(true),
      };

    case "BOOK_SEAT":
      const newSeatAvailability = [...state.seatAvailability];
      newSeatAvailability[action.payload] = false;
      return {
        ...state,
        seatAvailability: newSeatAvailability,
      };
    
    case "PARK_CAR":
      const newParkingSeat = [
        ...state.parkingSeat.slice(0, action.payload.parkId), 
        action.payload, 
        ...state.parkingSeat.slice(action.payload.parkId)
      ];      
      return {
        ...state,
        parkingSeat: newParkingSeat,
      };

    case "DEALLOCATE":
      const newDellocate = [...state.parkingSeat];
      newDellocate.splice(action.payload,1);
      const newSeatAvailabilitydel = [...state.seatAvailability];
      newSeatAvailabilitydel[action.payload] = true; 
      return {
        ...state,
        parkingSeat: newDellocate,
        seatAvailability: newSeatAvailabilitydel,
      }
    default:
      return state;
  }
};

export default actionReducer;
