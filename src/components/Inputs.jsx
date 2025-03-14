import React from 'react'
import { UilSearch } from "@iconscout/react-unicons";
import { useState } from 'react';

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const handleSearchClick = () => {
    if(city !== "" ) setQuery({city:city})
  }
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if( units !== selectedUnit ) setUnits(selectedUnit);
  }

  return( 
  <div className="flex flex-row justify-center my-6">
    <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input 
        value = {city}
        onChange={(e)=> setCity(e.currentTarget.value)}
        type="text" 
        placeholder="Search for city...."
        className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        data-testid="city"/>
    
    <UilSearch 
    size={25} 
    className="text-white cursor-pointer transition ease-out hover:scale-125"
    onClick={handleSearchClick}/>

     </div>
     <div className="flex flex-row w-1/4 items-center justify-center">
        <button 
        name="celsius"
        className="text-xl text-white font-light transition ease-out hover:scale-125"
    onClick = {handleUnitsChange}
        >&deg;C</button>
        <p className="text-xl text-white mx-1">|</p>
        <button 
        name="fahrenheit"
        className="text-xl text-white font-light transition ease-out hover:scale-125"
    onClick = {handleUnitsChange}
        >&deg;F</button>
     </div>
  </div>
  );
}

export default Inputs;