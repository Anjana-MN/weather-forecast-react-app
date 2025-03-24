import React from 'react'
import { iconURLFromCode } from '../services/weatherService';
import PropTypes from 'prop-types';

function Forecast({title,items}) {
  return (
    <div>
    <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
    </div>
    <hr className="my-2"/>
    <div className="flex flex-row items-center justify-between text-white">
        {items.map(item=>(
        <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm" data-testid="forecast-key">{item.key}</p>
            <img src={iconURLFromCode(item.weatherIcon)} className="w-12 my-1" alt="Weather Icon" />
            <p className="font-medium">{item.temperature ? item.temperature.toFixed() : "N/A"}&deg;</p>
        </div>
        ))}

    </div>
    </div>
  );
}

Forecast.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    weatherIcon: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
  })).isRequired,
};

Forecast.defaultProps = {
  title: 'Forecast',
  items: [],
};


export default Forecast;