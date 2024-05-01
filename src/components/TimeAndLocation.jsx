import React from 'react'

function TimeAndLocation({weather: {cityName,country,dateText,day,time}}) {
  return <div>
    <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
            {`${day}, ${dateText}`} | Local time: {time}
        </p>
    </div>
    <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
            {`${cityName},${country}`}
        </p>
    </div>
  </div>
}

export default TimeAndLocation