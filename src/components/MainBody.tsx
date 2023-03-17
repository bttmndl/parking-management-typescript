import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {seatCapacity} from '../redux/actionType'
import {useNavigate} from 'react-router-dom';

const MainBody:React.FC = () => {
  const navigate = useNavigate();
  const DISPATCH = useDispatch();
  const STATE = useSelector(state=>state);

  function handleClick(){
    navigate("/parkingSpaceSeat")
  }
  return (
    <div className='mainBody'>
        <input type="text" className='input_box' 
          placeholder='Please Enter No of Vehicle Spaces you need...' 
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>DISPATCH(seatCapacity(parseInt(e.target.value)))}
        />
        <button className='input_button' onClick={handleClick}>Submit</button>
    </div>
  )
}

export default MainBody