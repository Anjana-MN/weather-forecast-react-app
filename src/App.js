import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import getForecastWeather from './services/forecastService';
import { useEffect, useState } from 'react';

function App() {
  // const [ endpoint, setEndpoint ] = useState( "data" ); 
  const [ query, setQuery ] = useState({ city:'sydney',count:'5'});
  const [ units, setUnits ] = useState("celsius");
  const [ weather, setWeather ] = useState(null); 
  const [ forecast, setForecast ] = useState(null); 
  
  useEffect(()=>{
    const fetchWeather = async() => {
      await getFormattedWeatherData({...query}).then(
        (data) => {
          setWeather(data);
          console.log("data:",data);
          console.log("weatherInApp:",weather);
          console.log("dataMap:", weather.data)
        });
    };

    fetchWeather();
  }, [query, units, weather]);
  
  return (
  <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit 
  shadow-xl shadow-gray-400">
    <TopButtons setQuery={setQuery}/>
    <Inputs/>
    
    {weather && (
      <div>
    <TimeAndLocation weather={weather}/>
    <TemperatureAndDetails weather={weather}/>
    <Forecast title="Today's Forecast"/>
    <Forecast title="Daily Forecast"/>
    </div>
    )}
  </div>
  );
}

export default App;
