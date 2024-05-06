import { render,screen } from '@testing-library/react';
import TimeAndLocation from './TimeAndLocation';
import tempDetails from './weatherResponse';

test('Render time and location details correctly', () => {
    render(<TimeAndLocation weather={tempDetails}/>)
    const timeAndLocation = screen.getByTestId("timeAndLocation");
    // expect(timeAndLocation).toMatchObject<TimeAndLocation>(<p class="text-white text-xl font-extralight" data-testid="timeAndLocation">FRIDAY, 3 MAY 2024 | Local time: 12:22 AM</p>)
    expect(timeAndLocation).toMatchObject<TimeAndLocation>({...TimeAndLocation, day:"FRIDAY", dateText:"3 MAY 2024", time:"12:22 AM"})
})