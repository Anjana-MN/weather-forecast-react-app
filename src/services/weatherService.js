
const BASE_URL= "http://localhost:8080/api/weather/forecast";


const getWeatherData = async (infoType,searchParams) =>{
    const url = new URL(BASE_URL+"/"+infoType);
    url.search=new URLSearchParams({...searchParams});
    return fetch(url).then((res)=>res.json());
}

const formatCurrentWeather = (weatherInfo) =>{
    const{
        weatherData:{ temperature,description,additionalDescription,feelsLike,
            minTemp,maxTemp,humidity,windSpeed,weatherDetails,weatherIcon },
            sunRise,sunSet,country,cityName,
            coordinates:{ latitude,longitude }
    } = weatherInfo

    return { temperature,description,additionalDescription,feelsLike,
        minTemp,maxTemp,humidity,windSpeed,weatherDetails,weatherIcon,sunRise,sunSet,
        latitude,longitude,country,cityName }
}

const formatForecastWeather = (weatherInfo) => {
    const{ data:{dateText,temperature,weatherIcon}} = weatherInfo
    // data.map({ dateText,temperature,weatherIcon }) = weatherInfo

    // return{
    //     dateText,
    //     temperature,
    //     weatherIcon
    // }
    console.log("weatherInfo:",weatherInfo);
    return weatherInfo;
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("data",searchParams)
    .then(formatCurrentWeather)

    const forecastWeather = await getWeatherData("temperaturelist",searchParams);
    console.log("forecastWeather",forecastWeather);
    
    return {...formattedCurrentWeather, ...forecastWeather};
}

const iconURLFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {iconURLFromCode};

