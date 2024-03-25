import React from 'react'

function TimeAndLocation({weather: {cityName,country}}) {
  return <div>
    <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
            Friday, 15th March 2024 | Local time: 10:10 AM
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