import React from 'react'
import Header from './components/Header'
import MainBody from './components/MainBody'
import ParkingSpaceSeat from './pages/ParkingSpaceSeat'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ParkingExit from './pages/ParkingExit';

const App:React.FC = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainBody />} />
          <Route path="/parkingSpaceSeat" element={<ParkingSpaceSeat />} />
          <Route path="/parkingSpaceSeat/:id" element={<ParkingExit />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
