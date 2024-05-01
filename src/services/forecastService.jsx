const BASE_URL= "http://localhost:8080/api/weather/forecast";


const getWeatherData = async (infoType,searchParams) =>{
    const url = new URL(BASE_URL+"/"+infoType);
    url.search=new URLSearchParams({...searchParams});
    console.log(url);
    return fetch(url).then((res)=>res.json());
}

const getForecastWeather = async (searchParams) => {
    const forecastWeather = await getWeatherData("temperaturelist",searchParams);
    console.log(forecastWeather);
    return forecastWeather;
}

export default getForecastWeather;