import { getLocalStorage, setLocalStorage } from "../util/commonUtil";

const BASE_URL= "http://localhost:8081/api/weather/forecast";

const getWeatherData = async (infoType,searchParams) =>{
    const url = new URL(BASE_URL+"/"+infoType);
    url.search=new URLSearchParams({...searchParams});
    return fetch(url).then((res)=>res.json())
}

const getForecastWeather = async (searchParams) => {
    let key = searchParams.city+searchParams.units+"temperature";
    const forecastWeather = await getWeatherData("temperaturelist",searchParams)
    .then(data => setLocalStorage(data, key))
    .catch(e => {
        return getLocalStorage(key);
     });
    return forecastWeather;
}

export default getForecastWeather;