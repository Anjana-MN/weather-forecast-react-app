import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons";
import { iconURLFromCode } from '../services/weatherService';

function TemperatureAndDetails({weather: {temperature,feelsLike,
    minTemp,maxTemp,humidity,windSpeed,weatherDetails,weatherIcon,sunRise,sunSet}}) {
  return (
    <div>
    <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{weatherDetails}</p>
    </div>
    <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconURLFromCode(weatherIcon)} alt="" className="w-20"/>
        <p className="text-5xl" data-testid = "temp">{temperature}&deg;</p>
        <div className="flex flex-col space-y-2">
            <div className="flex font-light text-sm items-center justify-center">
                <UilTemperature size={18} className="mr-1"/>
                Real feel:
                <span className="font-medium ml-1">{feelsLike}&deg;</span>
            </div>
            <div className="flex font-light text-sm items-center justify-center">
                <UilTear size={18} className="mr-1"/>
                Humidity:
                <span className="font-medium ml-1">{humidity}%</span>
            </div>
            <div className="flex font-light text-sm items-center justify-center">
                <UilWind size={18} className="mr-1"/>
                Wind:
                <span className="font-medium ml-1">{windSpeed} km/h</span>
            </div>
        </div>
    </div>

    <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">

        <UilSun />
        <p className="font-light">Rise: <span className="font-medium ml-1">
            {sunRise}
            </span></p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">Set: <span className="font-medium ml-1">
            {sunSet}
            </span></p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light">High: <span className="font-medium ml-1">{maxTemp}&deg;</span></p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light">Low: <span className="font-medium ml-1">{minTemp}&deg;</span></p>
    </div>
    </div>
  );
}

export default TemperatureAndDetails;