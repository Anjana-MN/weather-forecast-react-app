export const getLocalStorage = async (key) => {
    let data = localStorage.getItem(key);
    if(data === undefined || !data){
        return {error: 'Unable to fetch current weather data'};
    }
    try{
        return JSON.parse(data);
    }
    catch(e){
        return {error: 'Unable to fetch current weather data'};
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

