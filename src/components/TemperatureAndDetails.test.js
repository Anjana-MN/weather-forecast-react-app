import { render,screen } from '@testing-library/react';
import TemperatureAndDetails from './TemperatureAndDetails';

const tempDetails = 
{
    "dateText": "3 MAY 2024",
    "day": "FRIDAY",
    "time": "12:22 AM",
    "temperature": 8.59,
    "description": null,
    "additionalDescription": null,
    "feelsLike": "6.25",
    "minTemp": 8.53,
    "maxTemp": 8.59,
    "humidity": "87",
    "windSpeed": 4.05,
    "weatherDetails": "Clouds",
    "weatherIcon": "04n",
    "sunRise": "05:36 AM",
    "sunSet": "07:45 PM",
    "country": "US",
    "cityName": "Boston",
    "coordinates": {
        "latitude": "42.3584",
        "longitude": "-71.0598"
    }
}

test('Temperature details renders correctly', () => {
    render (<TemperatureAndDetails weather={tempDetails}/>)
    const temp = screen.getByTestId("temp");
    expect(temp).toBeInTheDocument();
})