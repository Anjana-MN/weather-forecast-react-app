import { screen,render } from '@testing-library/react'
import Inputs from './Inputs'

test('Inputs renders correctly', () => {
    render(<Inputs units="celsius" />)
    const city = screen.getByTestId("city")
    expect(city).toBeInTheDocument()
})