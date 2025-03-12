import React from 'react'

function TopButtons({ setQuery }) {
    const cities = [
        {
            id:1,
            title:'London'
        },
        {
            id:2,
            title:'Sydney'
        },
        {
            id:3,
            title:'Toronto'
        },
        {
            id:4,
            title:'Tokyo'
        },
        {
            id:5,
            title:'Paris'
        }
    ]

    const handlePress =( city )=>{
        setQuery({city: city.title})
        // fetchWeather()
    }
  return <div className="flex items-center justify-around my-6">
    {cities.map((city)=>(
        <button key={city.id} className="text-white text-lg font-medium" data-testid="button"
        // onClick={()=>handlePress(city)}>{city.title}</button>
        onClick={()=>setQuery({city: city.title})}>{city.title}</button>
    ))}
  </div>
}

export default TopButtons;