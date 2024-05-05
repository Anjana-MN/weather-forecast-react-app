import { render,screen } from '@testing-library/react';
import Forecast from './Forecast';

const response = 
   [
    {
      "key": "11:30 AM",
      "temperature": 30.13,
      "weatherIcon": "03d"
    },
    {
      "key": "02:30 PM",
      "temperature": 31.59,
      "weatherIcon": "03d"
    },
    {
      "key": "05:30 PM",
      "temperature": 32.74,
      "weatherIcon": "02d"
    },
    {
      "key": "08:30 PM",
      "temperature": 29.7,
      "weatherIcon": "01n"
    },
    {
      "key": "11:30 PM",
      "temperature": 26.28,
      "weatherIcon": "01n"
    },
  ]

test('Forecast renders correctly', () => {
    render (<Forecast title="Timely Forecast" items={response} />)
    const forecast = screen.getAllByTestId("forecast-key");
    expect(forecast).toHaveLength(5);
})