import React, {useEffect, useState} from 'react';
import '../components/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import {parkCar, seatBooking} from '../redux/actionType';
import {useNavigate} from 'react-router-dom';

interface vehicledetails{
  parkId: number,
  vechicleNo: string,
  date: string,
  time: string,
}


const ParkingSpaceSeat:React.FC = () => {
  const DISPATCH = useDispatch();
  const {seatCapacity, seatAvailability, parkingSeat} = useSelector((state:any)=>state);
  const CURRENT_DATE = new Date();
  const MAX_DATE = new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), CURRENT_DATE.getDate()-30)
  const [toastFlag, setToastFlag] = useState<boolean>(false);
  const [currentVehice, setCurrentVehicle] = useState<vehicledetails>({
    parkId: 0,
    vechicleNo: "",
    date: "",
    time: "",
  })
  const navigate = useNavigate();

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>):void{
    setCurrentVehicle({...currentVehice, date:e.target.value})
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>):void{
    setCurrentVehicle({...currentVehice, time:e.target.value})
  }

  function handleVehicleNo (e: React.ChangeEvent<HTMLInputElement>): void{
    setCurrentVehicle({...currentVehice, vechicleNo: e.target.value});
  }

  /**
   * @param index seat delecation index
   */
  function handleSeatDeallocate(index: number): void{
    if(seatAvailability[index]) return;
    navigate(`/parkingSpaceSeat/${index}`);
  }

  function handleSeatBooking():void{
    if(currentVehice.vechicleNo===""){
        alert("Vehicle No can't be empty");
        return;
    }

    if(!seatAvailability.includes(true)) {
        setToastFlag(true);
        return;
    }
    let id = seatAvailability.indexOf(true);
    setCurrentVehicle({...currentVehice, parkId: id})
    DISPATCH(seatBooking(id));
    DISPATCH(parkCar(currentVehice));
  }
  

  return (
    <div style={{marginTop: "50px", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
        <div className='main-parking'>
            <div className='parking-space-seat'>
                {
                  [...Array(seatCapacity)].map((element:number,index:number)=>(
                      <div className='parking-seat' onClick={()=>handleSeatDeallocate(index)} style={{backgroundColor:!seatAvailability[index] ? "grey":"whitesmoke"}}>
                          <h4>pkn{index+1}</h4>
                      </div>
                  ))
                }
            </div>
        </div>

        <div className="container" style={{marginTop: "50px"}}>
            <input type="text" className="input" placeholder="Enter Vehicle Details..." onChange={handleVehicleNo}/>
            <div className="date-time-container">
                <input type="date" className="date-picker" onChange={handleDateChange} min={MAX_DATE.toISOString().slice(0, 10)} max={CURRENT_DATE.toISOString().slice(0, 10)} />
                <input type="time" className="time-picker" onChange={handleTimeChange} />
            </div>
            <button className="button" onClick={handleSeatBooking}>Submit</button>
        </div>
        
        {
          toastFlag && 
          <div className="popup-box-container">
              <div className="popup-box">
                  <p className="popup-message">Sorry! Parking is full</p>
                  <button className="close-button" onClick={()=>setToastFlag(false)}>X</button>
              </div>
          </div>
        }
    </div>
  )
}

export default ParkingSpaceSeat