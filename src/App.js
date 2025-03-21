import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [ query, setQuery ] = useState({ city:'bangalore' });
  const [ units, setUnits ] = useState("celsius");
  const [ weather, setWeather ] = useState(null); 
  
  const fetchWeather = async() => {
    await getFormattedWeatherData({...query,units}).then(
      (data) => {
        if(data.error){
          toast('Unable to fetch data for ' + query.city + " in " + units +'. Please try another city', {
          // toast(data.error,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"});
        } else{
          setWeather(data);
          toast('Fetched data successfully for ' + query.city, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"});
        }
      });
  };

  useEffect(()=>{
    fetchWeather();
  }, [query,units]);


  return (
  <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit 
  shadow-xl shadow-gray-400">
    <ToastContainer />
    <TopButtons setQuery={setQuery} />
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
    {weather && weather.data && (
      <div>
    <TimeAndLocation weather={weather}/>
    <TemperatureAndDetails weather={weather}/>
    <Forecast title="Timely Forecast" data-testid = "timelyforecast" items={weather.data.timeWindowResponses}/>
    <Forecast title="Daily Forecast" data-testid = "dailyforecast" items={weather.dailyForecast}  />
    </div>
    )}
  </div>
  );
}

export default App;
