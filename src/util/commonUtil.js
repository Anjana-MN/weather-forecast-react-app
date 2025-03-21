export const getLocalStorage = async (key,infoType) => {
    let data = localStorage.getItem(key);
    if(data === undefined || !data){
        return {error: 'Service is down. Please try another city.'};
    }
    try{
        let response = JSON.parse(data);
        if((infoType === "timely" && response.timeWindowResponses.length === 0) ||
        (infoType === "daily" && response.dailyForecast.length === 0) || 
        (infoType === "current" && response.cityName === null)) {
            return {error: 'Service is down. Please try another city.'};
        }
        
    }
    catch(e){
        return {error: 'Error while processing'};
    }
}

export const setLocalStorage = async (data, key)=>{
    if(data){
        try{
            localStorage.setItem(key, JSON.stringify(data));
        } catch(e){
            console.log('Unable to stringify the object: ', data);
        }
    }
}

