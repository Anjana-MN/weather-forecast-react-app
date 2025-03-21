import { getLocalStorage,setLocalStorage } from "../util/commonUtil";

const BASE_URL= "http://localhost:8081/api/weather/forecast";

const getWeatherData = async (infoType,searchParams) =>{
    const url = new URL(BASE_URL+"/"+infoType);
    let fetchedResponse = null;
    url.search=new URLSearchParams({...searchParams});
    fetchedResponse = await fetch(url).then((res)=>res.json()).catch(e => { return 'error'});
    // let serviceDown = false;
    // if(infoType === 'timely' && fetchedResponse.timeWindowResponses.length === 0){
    //     serviceDown=true;
    // }
    if(fetchedResponse === 'error'){
        alert(fetchedResponse.error.message)
        console.error(fetchedResponse.error)
    }
    return fetchedResponse;
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
            console.log('in empty list')
            return getLocalStorage(key,"current");
        } else{
            let data = formatCurrentWeather(weatherData);
            setLocalStorage(data, key);
            return data;
        }
    })
    .catch(e => {
        let data = getLocalStorage(key,"current");
        return data;
     });


    key = searchParams.city+searchParams.units+"timely";
    const forecastWeather = await getWeatherData("timely",searchParams)
    .then(response => response.json())
    .then(data=> 
        {
            console.log('time length is ', data.timeWindowResponses)
            if(data.timeWindowResponses.length == 0){
                console.log('in empty list')
                return getLocalStorage(key,"timely");
            } else{
                setLocalStorage(data, key);
                return data;
            }
           
        })
    .catch(e => {
        return getLocalStorage(key,"timely");
     });

    key = searchParams.city+searchParams.units+"daily";
    const dailyForecastWetaher = await getWeatherData("daily",searchParams)
    .then(data=> 
        {
            console.log('day length is ', data.dailyForecast.length)
            if(data.dailyForecast.length == 0){
                console.log('in empty list')
                return getLocalStorage(key,"daily");
            } else{
                setLocalStorage(data, key);
                return data;
            }
        })
    .catch(e => {
        return getLocalStorage(key,"daily");
     });    
    return {...formattedCurrentWeather, ...forecastWeather, ...dailyForecastWetaher};
}

const iconURLFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {iconURLFromCode};

