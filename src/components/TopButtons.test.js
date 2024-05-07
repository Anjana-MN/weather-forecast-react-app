import TopButtons from "./TopButtons";
import { render,screen } from '@testing-library/react'

test("TopButtons render correctly", () => {
    render(<TopButtons />)
    const button = screen.getAllByTestId("button")
    expect(button).toHaveLength(5)
})