import { getLocalStorage,setLocalStorage } from "../util/commonUtil";

const BASE_URL= "http://ec2-35-175-144-213.compute-1.amazonaws.com:8080/api/weather/forecast";

const getWeatherData = async (infoType,searchParams) =>{
    try{
        const url = new URL(`${BASE_URL}/${infoType}`);
        url.search=new URLSearchParams({...searchParams});
        let response = await fetch(url);
        
        if(!response.ok){
            throw new Error('Error while fetching response')
        } 
        const responseBody = await response.text();
        const jsonResponse = JSON.parse(responseBody);
        if (jsonResponse) {
            return jsonResponse;
        } else {
            throw new Error('Error while fetching response')
        }
    } catch(error){
        console.error('Error occurred:',error);
        throw error;
    }
}

const formatCurrentWeather = (weatherInfo) =>{
    const{
        weatherData:{ temperature,description,additionalDescription,feelsLike,
            minTemp,maxTemp,humidity,windSpeed,weatherDetails,weatherIcon,dateText,day,time },
            sunRise,sunSet,country,cityName
    } = weatherInfo

    return { temperature,description,additionalDescription,feelsLike,
        minTemp,maxTemp,humidity,windSpeed,weatherDetails,weatherIcon,sunRise,sunSet,
        country,cityName,dateText,day,time }
}

const getFormattedWeatherData = async (searchParams) => {
    
    let key = searchParams.city+searchParams.units+"current";
    const formattedCurrentWeather = await getWeatherData("current",searchParams)
    .then(weatherData => {
        if(weatherData.cityName == null){
            console.log('empty list due to circuit breaker implementation')
            return getLocalStorage(key,"current");
        } else{
            let data = formatCurrentWeather(weatherData);
            setLocalStorage(data, key);
            return data;
        }
    })
    .catch(e => {
        console.log(e);
        let data = getLocalStorage(key,"current");
        return data;
     });


    key = searchParams.city+searchParams.units+"timely";
    const timelyForecastWeather = await getWeatherData("timely",searchParams)
    .then(data=> 
        {
            if(data.data.timeWindowResponses.length === 0){
                console.log('empty list due to circuit breaker implementation')
                return getLocalStorage(key,"timely");
            } else{
                setLocalStorage(data.data.timeWindowResponses, key);
                return data;
            }
           
        })
    .catch(e => {
        console.log(e);
        return getLocalStorage(key,"timely");
     });

    key = searchParams.city+searchParams.units+"daily";
    const dailyForecastWeather = await getWeatherData("daily",searchParams)
    .then(data=> 
        {
            if(data.dailyForecast.length === 0){
                console.log('empty list due to circuit breaker implementation')
                return getLocalStorage(key,"daily");
            } else{
                setLocalStorage(data.dailyForecast, key);
                return data;
            }
        })
    .catch(e => {
        return getLocalStorage(key,"daily");
     });    
    return {...formattedCurrentWeather, ...timelyForecastWeather, ...dailyForecastWeather};
}

const iconURLFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {iconURLFromCode};

