import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import {deAllocate} from '../redux/actionType';

interface vehicledetails{
    parkId: number,
    vechicleNo: string,
    date: string,
    time: string,
}

const ParkingExit:React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const DISPATCH = useDispatch();
  const index = id !== undefined ? parseInt(id) : -1;
  const {seatCapacity, seatAvailability, parkingSeat} = useSelector((state:any)=>state);
  const VEHICLE_NO = index >= 0 && index < parkingSeat.length ? parkingSeat[index].vechicleNo : '';
  const navigate = useNavigate();
  
  const BOOKING_DATE: Date = parkingSeat && parkingSeat[index] ? new Date(parkingSeat[index].date + "T" + parkingSeat[index].time + ":00"): new Date();


  const NOW:Date= new Date();
  const TOTAL_HOURS: number = Math.floor((NOW.getTime() - BOOKING_DATE.getTime()) / ((1000 * 60 * 60)));
  

  function handlePayment():void{
    DISPATCH(deAllocate(index));
    alert("payment Successful");
    navigate("/parkingSpaceSeat");
  }

  


  return (
    <div className='main-parking-exit'>
        <div className='parking-exit'>
            <h1>Vehicle NO: <span>{VEHICLE_NO}</span></h1>
            <h3>Total Time: <span>{TOTAL_HOURS} Hour</span></h3>
            <h3>Total Charges : ${10+((TOTAL_HOURS-2)*10)} </h3>
            <button onClick={handlePayment}>PAY</button>
        </div>
    </div>
  )
}

export default ParkingExit