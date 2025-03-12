import { render,screen } from '@testing-library/react';
import TemperatureAndDetails from './TemperatureAndDetails';
import tempDetails from '../weatherResponse';



test('Temperature details renders correctly', () => {
    render (<TemperatureAndDetails weather={tempDetails}/>)
    const temp = screen.getByTestId("temp");
    expect(temp).toMatchObject<TemperatureAndDetails>({...TemperatureAndDetails, temperature:8.59});
})